import { useState, type ReactNode } from "react";
import { AppTreeView } from "../components/app_tree-view";
import type { TreeNodeData } from "../../../components/tree-view/react/tree-view";

function FolderIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M1.5 3h4.2l1.3 1.5h7.5V13h-13V3zm1 1v8h11V5.5H6.9L5.6 4H2.5z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M3.5 1.5h6l3 3V14.5h-9V1.5zm1 1v11h7V5.5H9V2.5H4.5z" />
    </svg>
  );
}

const fileTree: TreeNodeData[] = [
  {
    id: "src",
    label: "src",
    icon: <FolderIcon />,
    children: [
      {
        id: "components",
        label: "components",
        icon: <FolderIcon />,
        children: [
          { id: "button", label: "button.tsx", icon: <FileIcon /> },
          { id: "tree-view", label: "tree-view.tsx", icon: <FileIcon /> },
          { id: "accordion", label: "accordion.tsx", icon: <FileIcon /> },
        ],
      },
      {
        id: "pages",
        label: "pages",
        icon: <FolderIcon />,
        children: [
          { id: "home", label: "Home.tsx", icon: <FileIcon /> },
          { id: "layout", label: "Layout.tsx", icon: <FileIcon /> },
        ],
      },
      { id: "app", label: "App.tsx", icon: <FileIcon /> },
    ],
  },
  {
    id: "docs",
    label: "docs",
    icon: <FolderIcon />,
    children: [
      { id: "readme", label: "README.md", icon: <FileIcon /> },
      { id: "guidelines", label: "guidelines-with-a-very-long-label-that-truncates.md", icon: <FileIcon /> },
    ],
  },
  { id: "package", label: "package.json", icon: <FileIcon /> },
];

const plainTree: TreeNodeData[] = [
  {
    id: "branch-1",
    label: "Branch node",
    children: [
      { id: "leaf-1", label: "Leaf node" },
      {
        id: "branch-2",
        label: "Nested branch node",
        children: [{ id: "leaf-2", label: "Deeply nested leaf" }],
      },
    ],
  },
  { id: "leaf-3", label: "Top-level leaf node" },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-xs font-semibold tracking-widest text-muted uppercase">{title}</p>
      <div className="max-w-3xl border border-border bg-bg p-2">{children}</div>
    </section>
  );
}

export function TreeViewPage() {
  const [selected, setSelected] = useState<string | undefined>("button");

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Tree view</h1>
        <p className="max-w-2xl text-sm text-muted">
          Carbon-style hierarchical navigation with expandable branch nodes, leaf nodes, and
          single selection. Use arrow keys to move, expand, and collapse.
        </p>
      </section>

      <Section title="Small (default) - file system">
        <AppTreeView
          label="Project files"
          nodes={fileTree}
          defaultExpandedIds={["src", "components"]}
          selectedId={selected}
          onSelect={(node) => setSelected(node.id)}
        />
        <p className="px-2 pt-3 text-xs text-muted">Selected: {selected ?? "none"}</p>
      </Section>

      <Section title="Extra small - condensed">
        <AppTreeView
          size="xs"
          label="Condensed tree"
          nodes={fileTree}
          defaultExpandedIds={["src"]}
          defaultSelectedId="app"
        />
      </Section>

      <Section title="Leaf and branch nodes without icons">
        <AppTreeView
          label="Plain tree"
          nodes={plainTree}
          defaultExpandedIds={["branch-1"]}
          defaultSelectedId="leaf-2"
        />
      </Section>
    </main>
  );
}
