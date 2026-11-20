import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { SearchIcon } from "../../icons/react/search-icon";
import { PanelIcon } from "../../icons/react/panel-icon";
import { StarIcon } from "../../icons/react/star-icon";
import { ChevronDownIcon } from "../../icons/react/chevron-down-icon";

export type NodeSidebarTheme = "white" | "gray-10" | "gray-90" | "gray-100";
export type NodeSidebarDensity = "sm" | "md" | "lg";
export type NodeSidebarBehavior = "fixed" | "rail" | "overlay";
export type NodeSidebarTabStyle = "line" | "contained";
export type NodeSidebarTab = "all" | "recent" | "favourites";
export type NodeTagType = "popular" | "new" | "beta" | "outline";

export interface NodeItem {
  id: string;
  label: string;
  icon?: ReactNode;
  tags?: NodeTagType[];
  favourite?: boolean;
  recent?: boolean;
}

export interface NodeCategory {
  id: string;
  label: string;
  items: NodeItem[];
}

export interface NodeSidebarProps {
  categories: NodeCategory[];
  theme?: NodeSidebarTheme;
  density?: NodeSidebarDensity;
  behavior?: NodeSidebarBehavior;
  tabStyle?: NodeSidebarTabStyle;
  defaultTab?: NodeSidebarTab;
  footerLabel?: string;
  className?: string;
  onNodeSelect?: (node: NodeItem) => void;
}

interface ThemeTokens {
  panel: string;
  border: string;
  searchBg: string;
  hover: string;
  selected: string;
  muted: string;
  tabIdle: string;
  tabIdleBg: string;
  iconBox: string;
  panelBtn: string;
  empty: string;
}

const THEMES: Record<NodeSidebarTheme, ThemeTokens> = {
  white: {
    panel: "bg-white text-gray-900",
    border: "border-gray-200",
    searchBg: "bg-paper",
    hover: "hover:bg-paper",
    selected: "bg-paper",
    muted: "text-muted",
    tabIdle: "text-gray-700",
    tabIdleBg: "bg-paper",
    iconBox: "bg-paper",
    panelBtn: "border border-gray-300 hover:bg-gray-100",
    empty: "text-muted",
  },
  "gray-10": {
    panel: "bg-paper text-gray-900",
    border: "border-gray-300",
    searchBg: "bg-white",
    hover: "hover:bg-gray-200",
    selected: "bg-gray-200",
    muted: "text-muted",
    tabIdle: "text-gray-700",
    tabIdleBg: "bg-gray-200",
    iconBox: "bg-white",
    panelBtn: "border border-gray-300 hover:bg-gray-200",
    empty: "text-muted",
  },
  "gray-90": {
    panel: "bg-surface text-light",
    border: "border-border",
    searchBg: "bg-surface-hover",
    hover: "hover:bg-surface-hover",
    selected: "bg-surface-hover",
    muted: "text-muted",
    tabIdle: "text-subtle",
    tabIdleBg: "bg-surface-hover",
    iconBox: "bg-white/10",
    panelBtn: "border border-border hover:bg-surface-hover",
    empty: "text-muted",
  },
  "gray-100": {
    panel: "bg-bg text-light",
    border: "border-border",
    searchBg: "bg-surface-hover",
    hover: "hover:bg-surface-hover",
    selected: "bg-surface-hover",
    muted: "text-muted",
    tabIdle: "text-subtle",
    tabIdleBg: "bg-surface-hover",
    iconBox: "bg-white/10",
    panelBtn: "border border-border hover:bg-surface-hover",
    empty: "text-muted",
  },
};

const DENSITY = {
  sm: { row: "h-8 text-xs px-3 gap-2", label: "text-xs", search: "h-8", tab: "py-1.5 text-xs px-3", rail: "w-8" },
  md: { row: "h-10 text-sm px-4 gap-3", label: "text-sm", search: "h-10", tab: "py-2 text-sm px-4", rail: "w-12" },
  lg: { row: "h-12 text-sm px-4 gap-3", label: "text-sm", search: "h-10", tab: "py-2.5 text-sm px-4", rail: "w-12" },
} as const;

const TAG_LABEL: Record<NodeTagType, string> = {
  popular: "Popular",
  new: "New",
  beta: "Beta",
  outline: "Outline",
};

const TAG_STYLES = {
  light: {
    popular: "bg-[#d0e2ff] text-[#0043ce]",
    new: "bg-[#a7f0ba] text-[#0e6027]",
    beta: "bg-[#e0e0e0] text-[#393939]",
    outline: "border border-[#8d8d8d] text-[#525252]",
  },
  dark: {
    popular: "bg-[#002d9c] text-[#d0e2ff]",
    new: "bg-[#0e6027] text-[#a7f0ba]",
    beta: "bg-[#393939] text-[#c6c6c6]",
    outline: "border border-[#8d8d8d] text-[#c6c6c6]",
  },
} as const;

function Tag({ type, dark }: { type: NodeTagType; dark: boolean }) {
  const styles = dark ? TAG_STYLES.dark : TAG_STYLES.light;
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium leading-4 ${styles[type]}`}>
      {TAG_LABEL[type]}
    </span>
  );
}

export function NodeSidebar({
  categories,
  theme = "white",
  density = "md",
  behavior = "fixed",
  tabStyle = "line",
  defaultTab = "all",
  footerLabel = "IBM Carbon v11 · White",
  className,
  onNodeSelect,
}: NodeSidebarProps) {
  const t = THEMES[theme];
  const d = DENSITY[density];
  const dark = theme === "gray-90" || theme === "gray-100";

  const allItems = useMemo(() => categories.flatMap((c) => c.items), [categories]);

  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<NodeSidebarTab>(defaultTab);
  const [collapsed, setCollapsed] = useState(behavior === "rail");
  const [overlayOpen, setOverlayOpen] = useState(behavior !== "overlay");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    () => new Set(categories.map((c) => c.id)),
  );
  const [favIds, setFavIds] = useState<Set<string>>(
    () => new Set(allItems.filter((i) => i.favourite).map((i) => i.id)),
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleFav = (id: string) => {
    setFavIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const searching = query.trim().length > 0;

  const matches = (item: NodeItem) =>
    !searching || item.label.toLowerCase().includes(query.trim().toLowerCase());

  const tabFilter = (item: NodeItem) => {
    if (tab === "favourites") return favIds.has(item.id);
    if (tab === "recent") return item.recent === true;
    return true;
  };

  const visibleCategories = categories
    .map((c) => ({ ...c, items: c.items.filter((i) => matches(i) && tabFilter(i)) }))
    .filter((c) => c.items.length > 0 || !searching);

  const visibleCount = visibleCategories.reduce((n, c) => n + c.items.length, 0);
  const totalCount = allItems.length;

  const showEmpty = visibleCount === 0;

  const togglePanel = () => {
    if (behavior === "overlay") setOverlayOpen((open) => !open);
    else setCollapsed((c) => !c);
  };

  const tabs: { id: NodeSidebarTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "recent", label: "Recent" },
    { id: "favourites", label: "Favourites" },
  ];

  const header = (
    <div className={`flex items-center gap-2 p-3 pb-2`}>
      <div
        className={`flex min-w-0 flex-1 items-center gap-2 px-3 ${d.search} ${t.searchBg}`}
      >
        <SearchIcon className={`h-4 w-4 shrink-0 ${t.muted}`} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search nodes..."
          aria-label="Search nodes"
          className={`h-full w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted ${dark ? "text-light" : "text-gray-900"}`}
        />
        <kbd className={`shrink-0 text-xs ${t.muted}`}>⌘+F</kbd>
      </div>
      <button
        type="button"
        aria-label={collapsed ? "Expand panel" : "Collapse panel"}
        onClick={togglePanel}
        className={`grid ${density === "sm" ? "h-8 w-8" : "h-10 w-10"} shrink-0 place-items-center transition-colors focus-visible:ring-2 focus-visible:ring-primary ${t.panelBtn} ${t.muted}`}
      >
        <PanelIcon className="h-4 w-4" />
      </button>
    </div>
  );

  const tabsRow = (
    <div
      role="tablist"
      aria-label="Node filter"
      className={`flex items-end ${tabStyle === "line" ? `border-b ${t.border}` : ""}`}
    >
      {tabs.map(({ id, label }) => {
        const active = tab === id;
        if (tabStyle === "contained") {
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(id)}
              className={`${d.tab} transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                active
                  ? `border-b-2 border-primary font-semibold ${dark ? "text-light" : "text-gray-900"}`
                  : `${t.tabIdleBg} ${t.tabIdle}`
              }`}
            >
              {label}
            </button>
          );
        }
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => setTab(id)}
            className={`${d.tab} -mb-px border-b-2 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
              active
                ? `border-primary font-semibold ${dark ? "text-light" : "text-gray-900"}`
                : `border-transparent ${t.tabIdle}`
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );

  const body = (
    <div className="min-h-0 flex-1 overflow-y-auto">
      {showEmpty ? (
        <p className={`px-4 py-8 text-center text-sm ${t.empty}`}>
          {tab === "favourites"
            ? "No favourites yet"
            : tab === "recent"
              ? "No recent nodes"
              : "No nodes found"}
        </p>
      ) : (
        visibleCategories.map((category) => {
          const open = searching || openCategories.has(category.id);
          return (
            <section key={category.id} className={t.border}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => toggleCategory(category.id)}
                className={`flex w-full items-center gap-2 ${d.row} ${t.hover} focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary focus-visible:outline-none`}
              >
                <span className={`${d.label} font-medium`}>{category.label}</span>
                <span className={`ml-auto text-xs ${t.muted}`}>{category.items.length}</span>
                <ChevronDownIcon
                  className={`h-3.5 w-3.5 transition-transform ${open ? "" : "-rotate-90"} ${t.muted}`}
                />
              </button>
              {open && (
                <ul>
                  {category.items.map((item) => {
                    const faved = favIds.has(item.id);
                    const selected = selectedId === item.id;
                    return (
                      <li key={item.id} className="group relative">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(item.id);
                            onNodeSelect?.(item);
                          }}
                          className={`flex w-full items-center ${d.row} pr-10 text-left transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary focus-visible:outline-none ${
                            selected ? t.selected : t.hover
                          }`}
                        >
                          {item.icon && (
                            <span
                              className={`grid h-6 w-6 shrink-0 place-items-center rounded-sm ${t.iconBox}`}
                            >
                              {item.icon}
                            </span>
                          )}
                          <span className={`truncate ${d.label}`}>{item.label}</span>
                          {item.tags && item.tags.length > 0 && (
                            <span className="ml-1 flex shrink-0 gap-1">
                              {item.tags.map((tag) => (
                                <Tag key={tag} type={tag} dark={dark} />
                              ))}
                            </span>
                          )}
                        </button>
                        <button
                          type="button"
                          aria-label={faved ? "Remove favourite" : "Add favourite"}
                          aria-pressed={faved}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFav(item.id);
                          }}
                          className={`absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-sm text-primary transition-opacity focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                            faved ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                          }`}
                        >
                          <StarIcon filled={faved} className="h-4 w-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })
      )}
    </div>
  );

  const footer = (
    <footer className={`flex items-center justify-between border-t px-4 py-2 text-xs ${t.border} ${t.muted}`}>
      <span className="truncate">{footerLabel}</span>
      <span className="shrink-0 tabular-nums">{totalCount} nodes</span>
    </footer>
  );

  const railBody = (
    <div className="flex min-h-0 flex-1 flex-col items-center gap-1 overflow-y-auto py-2">
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col items-center gap-1">
          {category.items
            .filter((i) => matches(i) && tabFilter(i))
            .map((item) => {
              const selected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  title={item.label}
                  aria-label={item.label}
                  onClick={() => {
                    setSelectedId(item.id);
                    onNodeSelect?.(item);
                  }}
                  className={`grid h-8 w-8 place-items-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    selected ? t.selected : t.hover
                  }`}
                >
                  {item.icon ?? <span className={`h-2 w-2 rounded-full ${t.muted}`} />}
                </button>
              );
            })}
          <span className={`my-1 h-px w-4 ${dark ? "bg-border" : "bg-gray-200"}`} />
        </div>
      ))}
    </div>
  );

  const panelContent = collapsed ? (
    <>
      <button
        type="button"
        aria-label="Expand panel"
        onClick={togglePanel}
        className={`mx-auto mt-3 grid h-8 w-8 place-items-center rounded-sm transition-colors ${t.panelBtn} ${t.muted}`}
      >
        <PanelIcon className="h-4 w-4" />
      </button>
      {railBody}
      <footer className={`border-t px-2 py-2 text-center text-[10px] ${t.border} ${t.muted}`}>
        {totalCount}
      </footer>
    </>
  ) : (
    <>
      {header}
      {tabsRow}
      {body}
      {footer}
    </>
  );

  if (behavior === "overlay") {
    if (!overlayOpen) {
      return (
        <div className={`relative ${className ?? ""}`}>
          <button
            type="button"
            aria-label="Open node panel"
            onClick={() => setOverlayOpen(true)}
            className={`absolute top-4 left-4 z-20 grid h-10 w-10 place-items-center rounded-sm shadow-sm transition-colors ${t.panelBtn} ${t.panel} ${t.muted}`}
          >
            <PanelIcon className="h-4 w-4" />
          </button>
        </div>
      );
    }
    return (
      <div className={`relative ${className ?? ""}`}>
        <button
          type="button"
          aria-label="Close node panel"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setOverlayOpen(false)}
          className="absolute inset-0 z-10 cursor-default bg-black/50"
        />
        <aside
          aria-label="Node panel"
          className={`absolute inset-y-0 left-0 z-20 flex w-80 flex-col shadow-2xl ${t.panel} ${t.border}`}
        >
          {panelContent}
        </aside>
      </div>
    );
  }

  return (
    <aside
      aria-label="Node panel"
      className={`flex flex-col transition-[width] duration-200 ${t.panel} ${
        collapsed ? DENSITY[density].rail : "w-80"
      } ${className ?? ""}`}
    >
      {panelContent}
    </aside>
  );
}
