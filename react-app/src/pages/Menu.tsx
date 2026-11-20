import { useState, type ReactNode } from "react";
import { AppButton } from "../components/app_button";
import { AppMenu } from "../components/app_menu";
import type { MenuEntry } from "../../../components/menus/react/menu";
import { KebabIcon } from "../../../components/icons/react/kebab-icon";

function IconBase({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className="h-4 w-4">
      {children}
    </svg>
  );
}

function ShareIcon() {
  return (
    <IconBase>
      <path d="M1.5 3.5h4l1.2 1.5h7.8v7.5H1.5z" />
      <path d="M6 10.5h4M8.5 8.5l2 2-2 2" />
    </IconBase>
  );
}

function CutIcon() {
  return (
    <IconBase>
      <circle cx="4" cy="4.5" r="1.8" />
      <circle cx="4" cy="11.5" r="1.8" />
      <path d="M5.5 5.5 14 12M5.5 10.5 14 4" />
    </IconBase>
  );
}

function CopyIcon() {
  return (
    <IconBase>
      <rect x="5.5" y="5.5" width="8" height="8" />
      <path d="M10.5 5.5V2.5h-8v8h3" />
    </IconBase>
  );
}

function PasteIcon() {
  return (
    <IconBase>
      <rect x="2.5" y="3" width="9" height="11" />
      <path d="M5.5 3V1.5h3V3M9 9l4 4M13 9l-4 4" />
    </IconBase>
  );
}

const shareOptions = ["None", "Product team", "Organization", "Company"];
const textStyles = [
  { id: "none", label: "None" },
  { id: "overline", label: "Overline" },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-xs font-semibold tracking-widest text-muted uppercase">{title}</p>
      {children}
    </section>
  );
}

export function MenuPage() {
  const [shareWith, setShareWith] = useState("Product team");
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [textStyle, setTextStyle] = useState("none");
  const [last, setLast] = useState<string | null>(null);

  function handleSelect(id: string) {
    setLast(id);
    if (id === "bold") setBold((v) => !v);
    if (id === "italic") setItalic((v) => !v);
    if (id.startsWith("share-")) setShareWith(id.slice("share-".length));
    if (id.startsWith("style-")) setTextStyle(id.slice("style-".length));
  }

  const editItems: MenuEntry[] = [
    {
      id: "share-with",
      label: "Share with",
      icon: <ShareIcon />,
      items: shareOptions.map((label) => ({
        id: `share-${label}`,
        label,
        selected: shareWith === label,
      })),
    },
    { type: "divider" },
    { id: "cut", label: "Cut", icon: <CutIcon />, shortcut: "⌘X" },
    { id: "copy", label: "Copy", icon: <CopyIcon />, shortcut: "⌘C" },
    { id: "paste", label: "Paste", icon: <PasteIcon />, shortcut: "⌘V", disabled: true },
    { type: "divider" },
    {
      id: "bold",
      label: "Bold",
      icon: <span className="text-sm font-bold">B</span>,
      shortcut: "⌘B",
      selected: bold,
    },
    {
      id: "italic",
      label: "Italic",
      icon: <span className="text-sm italic">I</span>,
      shortcut: "⌘I",
      selected: italic,
    },
    { type: "divider" },
    ...textStyles.map((s) => ({
      id: `style-${s.id}`,
      label: s.label,
      selected: textStyle === s.id,
    })),
  ];

  const kebabItems: MenuEntry[] = [
    { id: "edit", label: "Edit" },
    { id: "duplicate", label: "Duplicate" },
    { id: "archive", label: "Archive", disabled: true },
    { type: "divider" },
    { id: "delete", label: "Delete", danger: true },
  ];

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Menu</h1>
        <p className="max-w-2xl text-sm text-muted">
          IBM Carbon context menu: 32px rows, check and icon columns, keyboard shortcuts,
          nested submenus, and disabled items. Positioned with Popper.
        </p>
      </section>

      <Section title="Context menu">
        <div className="flex items-start gap-6">
          <AppMenu
            ariaLabel="Text options"
            items={editItems}
            onSelect={handleSelect}
            trigger={<AppButton kind="secondary">Open context menu</AppButton>}
          />
          <p className="text-sm text-muted">
            Last action: <span className="text-light">{last ?? "none"}</span>
          </p>
        </div>
      </Section>

      <Section title="Kebab menu">
        <div className="flex items-center gap-6">
          <AppMenu
            ariaLabel="Row actions"
            items={kebabItems}
            onSelect={setLast}
            trigger={<AppButton iconOnly aria-label="More options" icon={<KebabIcon />} />}
          />
        </div>
      </Section>
    </main>
  );
}
