/**
 * Component: TreeView
 * Design system: IBM Carbon Design System (Tree view guidelines)
 * Variants: sm (32px node, default), xs (24px node)
 * Behaviors: branch nodes expand/collapse, leaf nodes at any level, single selection,
 *            collapsed branch inherits selected state of a hidden child,
 *            roving focus with WAI-ARIA tree keyboard controls.
 * Usage: pass `nodes` (nested TreeNodeData). Branch = node with `children`.
 */
import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronDownIcon } from "../../icons/react/chevron-down-icon";

export type TreeViewSize = "sm" | "xs";

export interface TreeNodeData {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNodeData[];
}

export interface TreeViewProps {
  nodes: TreeNodeData[];
  size?: TreeViewSize;
  label?: string;
  selectedId?: string;
  defaultSelectedId?: string;
  onSelect?: (node: TreeNodeData) => void;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onToggle?: (id: string, expanded: boolean) => void;
  className?: string;
}

interface IndexEntry {
  node: TreeNodeData;
  parentId: string | null;
}

const sizeConfig = {
  sm: {
    row: "h-8 text-sm",
    caret: "h-8 w-8",
    icon: "h-6 w-6",
  },
  xs: {
    row: "h-6 text-xs",
    caret: "h-6 w-6",
    icon: "h-5 w-5",
  },
} as const;

function buildIndex(nodes: TreeNodeData[]): Map<string, IndexEntry> {
  const map = new Map<string, IndexEntry>();
  const walk = (list: TreeNodeData[], parentId: string | null) => {
    for (const node of list) {
      map.set(node.id, { node, parentId });
      if (node.children?.length) walk(node.children, node.id);
    }
  };
  walk(nodes, null);
  return map;
}

function computeVisible(nodes: TreeNodeData[], expanded: Set<string>): string[] {
  const out: string[] = [];
  const walk = (list: TreeNodeData[]) => {
    for (const node of list) {
      out.push(node.id);
      if (node.children?.length && expanded.has(node.id)) walk(node.children);
    }
  };
  walk(nodes);
  return out;
}

export function TreeView({
  nodes,
  size = "sm",
  label = "Tree view",
  selectedId: controlledSelectedId,
  defaultSelectedId,
  onSelect,
  expandedIds,
  defaultExpandedIds = [],
  onToggle,
  className = "",
}: TreeViewProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(
    defaultSelectedId,
  );
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    () => new Set(defaultExpandedIds),
  );
  const [focusedId, setFocusedId] = useState<string | undefined>(undefined);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  const selectedId = controlledSelectedId ?? internalSelectedId;
  const expanded = useMemo(
    () => (expandedIds ? new Set(expandedIds) : internalExpanded),
    [expandedIds, internalExpanded],
  );

  const index = useMemo(() => buildIndex(nodes), [nodes]);
  const order = useMemo(() => computeVisible(nodes, expanded), [nodes, expanded]);
  const visibleSet = useMemo(() => new Set(order), [order]);

  // Nearest visible node for an id: the id itself, or its closest visible ancestor
  // (used for focus stops and for inheriting the selected state of a collapsed branch).
  const visibleAnchor = (id: string | undefined): string | undefined => {
    let current = id;
    while (current !== undefined && !visibleSet.has(current)) {
      current = index.get(current)?.parentId ?? undefined;
    }
    return current;
  };

  const tabStopId = visibleAnchor(focusedId ?? selectedId ?? nodes[0]?.id);
  const inheritedSelectedId = visibleAnchor(selectedId);
  const sizes = sizeConfig[size];

  const setNodeExpanded = (id: string, next: boolean) => {
    if (!expandedIds) {
      setInternalExpanded((prev) => {
        const set = new Set(prev);
        if (next) set.add(id);
        else set.delete(id);
        return set;
      });
    }
    onToggle?.(id, next);
  };

  const selectNode = (id: string) => {
    const entry = index.get(id);
    if (!entry) return;
    if (controlledSelectedId === undefined) setInternalSelectedId(id);
    onSelect?.(entry.node);
  };

  const focusItem = (id: string | undefined) => {
    if (id === undefined) return;
    setFocusedId(id);
    itemRefs.current.get(id)?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>, id: string) => {
    const entry = index.get(id);
    if (!entry) return;
    const isBranch = !!entry.node.children?.length;
    const isOpen = expanded.has(id);
    const position = order.indexOf(id);

    switch (event.key) {
      case "ArrowDown":
        focusItem(order[position + 1]);
        break;
      case "ArrowUp":
        focusItem(order[position - 1]);
        break;
      case "Home":
        focusItem(order[0]);
        break;
      case "End":
        focusItem(order[order.length - 1]);
        break;
      case "ArrowRight":
        if (isBranch && !isOpen) setNodeExpanded(id, true);
        else if (isBranch && isOpen) focusItem(entry.node.children?.[0]?.id);
        break;
      case "ArrowLeft":
        if (isBranch && isOpen) setNodeExpanded(id, false);
        else if (entry.parentId) focusItem(entry.parentId);
        break;
      case "Enter":
      case " ":
        selectNode(id);
        break;
      default:
        return;
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const renderNodes = (list: TreeNodeData[], level: number): ReactNode =>
    list.map((node, i) => {
      const isBranch = !!node.children?.length;
      const isOpen = isBranch && expanded.has(node.id);
      const isSelected = node.id === selectedId;
      const isInherited = !isSelected && node.id === inheritedSelectedId;

      const stateClass = isSelected
        ? "bg-surface-hover font-semibold"
        : isInherited
          ? "bg-surface"
          : "hover:bg-surface-hover";

      return (
        <li
          key={node.id}
          role="treeitem"
          aria-level={level}
          aria-setsize={list.length}
          aria-posinset={i + 1}
          aria-selected={isSelected}
          aria-expanded={isBranch ? isOpen : undefined}
          tabIndex={node.id === tabStopId ? 0 : -1}
          ref={(el) => {
            if (el) itemRefs.current.set(node.id, el);
            else itemRefs.current.delete(node.id);
          }}
          onFocus={() => setFocusedId(node.id)}
          onKeyDown={(event) => handleKeyDown(event, node.id)}
          className="group outline-none"
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
              focusItem(node.id);
              selectNode(node.id);
            }}
            className={`flex w-full min-w-0 cursor-pointer items-center text-light transition-colors duration-150 group-focus-visible:outline-2 group-focus-visible:-outline-offset-2 group-focus-visible:outline-primary ${sizes.row} ${stateClass}`}
          >
            {isBranch ? (
              <span
                aria-hidden="true"
                onClick={(event) => {
                  event.stopPropagation();
                  setNodeExpanded(node.id, !isOpen);
                }}
                className={`flex shrink-0 items-center justify-center ${sizes.caret}`}
              >
                <ChevronDownIcon
                  className={`${sizes.icon} transition-transform duration-150 ${
                    isOpen ? "" : "-rotate-90"
                  }`}
                />
              </span>
            ) : (
              <span aria-hidden="true" className={`shrink-0 ${sizes.caret}`} />
            )}
            {node.icon && (
              <span
                className={`flex shrink-0 items-center pr-2 ${sizes.icon}`}
                aria-hidden="true"
              >
                {node.icon}
              </span>
            )}
            <span className="min-w-0 flex-1 truncate pr-3" title={node.label}>
              {node.label}
            </span>
          </div>
          {isOpen && (
            <ul role="group" className="pl-4">
              {renderNodes(node.children ?? [], level + 1)}
            </ul>
          )}
        </li>
      );
    });

  return (
    <ul
      role="tree"
      aria-label={label}
      className={`flex w-full flex-col ${className}`}
    >
      {renderNodes(nodes, 1)}
    </ul>
  );
}
