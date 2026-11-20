/**
 * Component: Menu
 * Design system: IBM Carbon Design System (context menu)
 * Variants: nested submenus (hover / click / ArrowRight), checkable items (`selected`),
 * shortcut hints, danger and disabled items, dividers.
 * Positioning: @popperjs/core (flip + preventOverflow). Panels are portaled to <body>.
 * Usage: pass a `trigger` element (e.g. an icon button) and `items`. Items are
 * `{ id, label, icon?, shortcut?, disabled?, danger?, selected?, items? }` or `{ type: "divider" }`.
 * Set `selected` (true/false) on any item to reserve a check column for the whole list.
 * Set `icon` on any item to reserve an icon column for the whole list.
 * Items with `items` open a submenu. `onSelect` receives the id of a leaf item.
 */
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { createPopper, type Instance, type Placement } from "@popperjs/core";

export interface MenuItemData {
  type?: "item";
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  /** Keyboard shortcut hint, rendered right-aligned (e.g. "⌘X"). */
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  /** Checkable item. `true` shows a check mark. Presence of `selected` on any sibling reserves the check column. */
  selected?: boolean;
  /** Nested submenu entries. */
  items?: MenuEntry[];
}

export interface MenuDividerData {
  type: "divider";
  id?: string;
}

export type MenuEntry = MenuItemData | MenuDividerData;

export interface MenuProps {
  trigger: ReactNode;
  items: MenuEntry[];
  onSelect?: (id: string) => void;
  placement?: Placement;
  ariaLabel?: string;
  className?: string;
}

const ROOT_OFFSET: [number, number] = [0, 4];
const SUB_OFFSET: [number, number] = [0, 0];
const SUB_PLACEMENT: Placement = "right-start";

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M6.5 10.6 3.9 8l-1 1 3.6 3.6 7-7-1-1z" fill="currentColor" />
    </svg>
  );
}

function SubmenuIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0">
      <path d="M6 3.5 10.5 8 6 12.5l-.7-.7L9.1 8 5.3 4.2z" />
    </svg>
  );
}

function getEnabledRows(panel: HTMLElement | null): HTMLButtonElement[] {
  if (!panel) return [];
  return Array.from(panel.querySelectorAll<HTMLButtonElement>("[data-menu-row]:not(:disabled)"));
}

interface MenuPanelProps {
  items: MenuEntry[];
  reference: HTMLElement | null;
  placement: Placement;
  offset: [number, number];
  groupId: string;
  depth: number;
  focusFirst: boolean;
  ariaLabel?: string;
  onSelect: (id: string) => void;
  onDismiss: () => void;
  onDismissAll: () => void;
}

interface OpenSubmenu {
  id: string;
  focus: boolean;
}

function MenuPanel({
  items,
  reference,
  placement,
  offset,
  groupId,
  depth,
  focusFirst,
  ariaLabel,
  onSelect,
  onDismiss,
  onDismissAll,
}: MenuPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<string, HTMLButtonElement>());
  const [openSub, setOpenSub] = useState<OpenSubmenu | null>(null);

  const hasCheckSlot = items.some((i) => i.type !== "divider" && i.selected !== undefined);
  const hasIconSlot = items.some((i) => i.type !== "divider" && i.icon !== undefined);

  // Position with Popper.
  useLayoutEffect(() => {
    if (!reference || !panelRef.current) return;
    const instance: Instance = createPopper(reference, panelRef.current, {
      placement,
      strategy: "fixed",
      modifiers: [
        { name: "offset", options: { offset } },
        { name: "preventOverflow", options: { padding: 8 } },
        { name: "flip", options: { fallbackPlacements: ["left-start", "top-start", "bottom-start"] } },
      ],
    });
    return () => instance.destroy();
  }, [reference, placement, offset]);

  // Move focus into the panel when opened via keyboard.
  useEffect(() => {
    if (focusFirst) getEnabledRows(panelRef.current)[0]?.focus();
  }, [focusFirst]);

  function focusRow(rows: HTMLButtonElement[], index: number) {
    rows[index]?.focus();
  }

  function findItem(id: string): MenuItemData | undefined {
    return items.find((i): i is MenuItemData => i.type !== "divider" && i.id === id);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    // Nested panels are portaled but still bubble through React; handle each key once.
    e.stopPropagation();
    const rows = getEnabledRows(panelRef.current);
    const current = rows.indexOf(document.activeElement as HTMLButtonElement);
    const count = rows.length;
    if (count === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusRow(rows, current < 0 ? 0 : (current + 1) % count);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusRow(rows, current <= 0 ? count - 1 : current - 1);
        break;
      case "Home":
        e.preventDefault();
        focusRow(rows, 0);
        break;
      case "End":
        e.preventDefault();
        focusRow(rows, count - 1);
        break;
      case "ArrowRight": {
        const id = (document.activeElement as HTMLElement | null)?.dataset.id;
        const item = id ? findItem(id) : undefined;
        if (item?.items) {
          e.preventDefault();
          setOpenSub({ id: item.id, focus: true });
        }
        break;
      }
      case "ArrowLeft":
        if (depth > 0) {
          e.preventDefault();
          onDismiss();
        }
        break;
      case "Escape":
        e.preventDefault();
        onDismiss();
        break;
      case "Tab":
        onDismissAll();
        break;
    }
  }

  function activate(item: MenuItemData, via: "pointer" | "keyboard") {
    if (item.disabled) return;
    if (item.items) {
      setOpenSub({ id: item.id, focus: via === "keyboard" });
      return;
    }
    onSelect(item.id);
  }

  const subItem = openSub ? findItem(openSub.id) : undefined;
  const subReference = openSub ? rowRefs.current.get(openSub.id) ?? null : null;

  return (
    <>
      <div
        ref={panelRef}
        role="menu"
        aria-label={ariaLabel}
        data-menu-group={groupId}
        onKeyDown={onKeyDown}
        className={`fixed top-0 left-0 z-50 bg-menu py-1 shadow-[0_2px_6px_rgba(0,0,0,0.3)] ${
          depth > 0 ? "min-w-40" : "min-w-48"
        }`}
      >
        {items.map((entry, index) => {
          if (entry.type === "divider") {
            return <div key={entry.id ?? `divider-${index}`} role="separator" className="my-1 h-px bg-border" />;
          }
          const item = entry;
          const expanded = openSub?.id === item.id;
          const checkable = item.selected !== undefined;
          return (
            <button
              key={item.id}
              ref={(node) => {
                if (node) rowRefs.current.set(item.id, node);
                else rowRefs.current.delete(item.id);
              }}
              type="button"
              role={checkable ? "menuitemradio" : "menuitem"}
              aria-checked={checkable ? item.selected : undefined}
              aria-haspopup={item.items ? "menu" : undefined}
              aria-expanded={item.items ? expanded : undefined}
              data-menu-row
              data-id={item.id}
              disabled={item.disabled}
              onMouseEnter={(e) => {
                if (item.disabled) return;
                e.currentTarget.focus();
                setOpenSub(item.items ? { id: item.id, focus: false } : null);
              }}
              onClick={(e) => activate(item, e.detail === 0 ? "keyboard" : "pointer")}
              className={[
                "flex h-8 w-full cursor-pointer items-center gap-2 px-4 text-left text-sm",
                "outline-none focus:-outline-offset-2 focus:outline-2 focus:outline-primary",
                "disabled:cursor-not-allowed disabled:text-muted",
                item.danger ? "text-error" : "text-light",
                expanded ? "bg-surface-hover" : "hover:bg-surface-hover",
              ].join(" ")}
            >
              {hasCheckSlot && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  {item.selected ? <CheckIcon /> : null}
                </span>
              )}
              {hasIconSlot && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">{item.icon}</span>
              )}
              <span className="flex-1 truncate">{item.label}</span>
              {item.shortcut && <span className="shrink-0 text-muted">{item.shortcut}</span>}
              {item.items && <SubmenuIcon />}
            </button>
          );
        })}
      </div>

      {subItem?.items &&
        createPortal(
          <MenuPanel
            key={subItem.id}
            items={subItem.items}
            reference={subReference}
            placement={SUB_PLACEMENT}
            offset={SUB_OFFSET}
            groupId={groupId}
            depth={depth + 1}
            focusFirst={openSub?.focus ?? false}
            onSelect={onSelect}
            onDismissAll={onDismissAll}
            onDismiss={() => {
              const id = subItem.id;
              setOpenSub(null);
              rowRefs.current.get(id)?.focus();
            }}
          />,
          document.body,
        )}
    </>
  );
}

export function Menu({
  trigger,
  items,
  onSelect,
  placement = "bottom-start",
  ariaLabel,
  className = "",
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const [focusFirst, setFocusFirst] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const groupId = useId();

  // Close on pointer down outside the trigger and every panel of this menu.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Element | null;
      if (!target) return;
      if (wrapperRef.current?.contains(target)) return;
      if (target.closest?.(`[data-menu-group="${groupId}"]`)) return;
      setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, groupId]);

  function closeAndRestoreFocus() {
    setOpen(false);
    wrapperRef.current?.querySelector<HTMLElement>("button, [href], input, [tabindex]")?.focus();
  }

  function handleSelect(id: string) {
    onSelect?.(id);
    closeAndRestoreFocus();
  }

  function onTriggerClick() {
    setFocusFirst(false);
    setOpen((o) => !o);
  }

  function onTriggerKeyDown(e: KeyboardEvent<HTMLSpanElement>) {
    if (!open && e.key === "ArrowDown") {
      e.preventDefault();
      setFocusFirst(true);
      setOpen(true);
    }
  }

  return (
    <>
      <span
        ref={wrapperRef}
        className={`inline-flex ${className}`}
        onClick={onTriggerClick}
        onKeyDown={onTriggerKeyDown}
      >
        {trigger}
      </span>
      {open &&
        createPortal(
          <MenuPanel
            items={items}
            reference={wrapperRef.current}
            placement={placement}
            offset={ROOT_OFFSET}
            groupId={groupId}
            depth={0}
            focusFirst={focusFirst}
            ariaLabel={ariaLabel}
            onSelect={handleSelect}
            onDismiss={closeAndRestoreFocus}
            onDismissAll={() => setOpen(false)}
          />,
          document.body,
        )}
    </>
  );
}
