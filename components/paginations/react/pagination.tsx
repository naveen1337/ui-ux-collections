/**
 * Component: Pagination
 * Design system: IBM Carbon Design System
 * Variants: xs/sm/md/lg sizes, first-page/last-page boundary states (auto-disabled prev/next)
 * Usage: bar pagination for tables or page content. Controlled via `page`/`pageSize`
 * with `onPageChange`/`onPageSizeChange` callbacks.
 */
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "../../icons/react/chevron-down-icon";
import { CaretLeftIcon } from "../../icons/react/caret-left-icon";
import { CaretRightIcon } from "../../icons/react/caret-right-icon";

export type PaginationSize = "xs" | "sm" | "md" | "lg";

export interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  pageSizes?: number[];
  size?: PaginationSize;
  itemsPerPageText?: string;
  formatRangeText?: (start: number, end: number, totalItems: number) => string;
  formatPagesText?: (pages: number) => string;
  previousPageLabel?: string;
  nextPageLabel?: string;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}

const sizeConfig = {
  xs: {
    height: "h-6",
    text: "text-xs",
    button: "w-6",
    icon: "h-3.5 w-3.5",
    option: "px-3 py-1 text-xs",
  },
  sm: {
    height: "h-8",
    text: "text-xs",
    button: "w-8",
    icon: "h-3.5 w-3.5",
    option: "px-4 py-1.5 text-xs",
  },
  md: {
    height: "h-10",
    text: "text-sm",
    button: "w-10",
    icon: "h-4 w-4",
    option: "px-4 py-2 text-sm",
  },
  lg: {
    height: "h-12",
    text: "text-base",
    button: "w-12",
    icon: "h-4 w-4",
    option: "px-4 py-2.5 text-base",
  },
} as const;

interface InlineSelectOption {
  value: string;
  label: string;
}

interface InlineSelectProps {
  label: string;
  options: InlineSelectOption[];
  selected: string;
  onChange: (value: string) => void;
  align?: "start" | "end";
  optionClassName: string;
  triggerClassName: string;
  children: ReactNode;
}

function InlineSelect({
  label,
  options,
  selected,
  onChange,
  align = "start",
  optionClassName,
  triggerClassName,
  children,
}: InlineSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const selectedIndex = Math.max(
    options.findIndex((o) => o.value === selected),
    0,
  );

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(value: string) {
    onChange(value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function openMenu() {
    setActiveIndex(selectedIndex);
    setOpen(true);
  }

  function onKeyDownTrigger(e: React.KeyboardEvent) {
    if (open) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, options.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
        case " ": {
          e.preventDefault();
          const option = options[activeIndex];
          if (option) choose(option.value);
          break;
        }
        case "Tab":
          setOpen(false);
          break;
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
      case "Enter":
      case " ":
        e.preventDefault();
        openMenu();
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative flex h-full">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={label}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDownTrigger}
        className={`flex h-full items-center text-light transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-transparent ${triggerClassName}`}
      >
        {children}
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className={`absolute top-full z-10 mt-px max-h-64 w-max overflow-y-auto border border-surface-hover bg-surface py-1 shadow-[0_2px_6px_rgba(0,0,0,0.2)] ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === selected;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex((i) => (i === index ? -1 : i))}
                onClick={() => choose(option.value)}
                className={`flex cursor-pointer items-center whitespace-nowrap text-light hover:bg-surface-hover ${
                  index === activeIndex || isSelected ? "bg-surface-hover" : ""
                } ${optionClassName}`}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function Pagination({
  page,
  pageSize,
  totalItems,
  pageSizes = [10, 20, 30, 40, 50],
  size = "md",
  itemsPerPageText = "Items per page:",
  formatRangeText = (start, end, total) => `${start}–${end} of ${total} items`,
  formatPagesText = (pages) => `of ${pages} pages`,
  previousPageLabel = "Previous page",
  nextPageLabel = "Next page",
  onPageChange,
  onPageSizeChange,
  className = "",
}: PaginationProps) {
  const config = sizeConfig[size];
  const pages = Math.max(1, Math.ceil(totalItems / pageSize));
  const current = Math.min(Math.max(page, 1), pages);
  const start = totalItems === 0 ? 0 : (current - 1) * pageSize + 1;
  const end = totalItems === 0 ? 0 : Math.min(current * pageSize, totalItems);

  const pageSizeOptions: InlineSelectOption[] = pageSizes.map((value) => ({
    value: String(value),
    label: String(value),
  }));
  const pageOptions: InlineSelectOption[] = Array.from({ length: pages }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary";
  const disabledButton =
    "disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-transparent";

  return (
    <div className={`flex border-t border-border bg-surface text-light ${config.height} ${className}`}>
      <div className="flex h-full min-w-0 items-center">
        <span className={`pl-4 pr-2 ${config.text}`}>{itemsPerPageText}</span>
        <InlineSelect
          label={itemsPerPageText}
          options={pageSizeOptions}
          selected={String(pageSize)}
          align="start"
          optionClassName={config.option}
          triggerClassName={`gap-2 border-r border-border pl-2 pr-3 ${config.text}`}
          onChange={(value) => {
            if (value !== String(pageSize)) {
              onPageSizeChange?.(Number(value));
              onPageChange(1);
            }
          }}
        >
          <span className={config.text}>{pageSize}</span>
          <ChevronDownIcon className={`shrink-0 ${config.icon}`} />
        </InlineSelect>
        <span className={`min-w-0 truncate pl-4 text-subtle ${config.text}`}>
          {formatRangeText(start, end, totalItems)}
        </span>
      </div>

      <div className="ml-auto flex h-full items-center border-l border-border">
        <InlineSelect
          label="Page number"
          options={pageOptions}
          selected={String(current)}
          align="end"
          optionClassName={config.option}
          triggerClassName={`gap-2 pl-4 pr-2 ${config.text}`}
          onChange={(value) => onPageChange(Number(value))}
        >
          <span className={config.text}>{current}</span>
          <ChevronDownIcon className={`shrink-0 ${config.icon}`} />
        </InlineSelect>
        <span className={`pl-1.5 pr-4 ${config.text}`}>{formatPagesText(pages)}</span>

        <button
          type="button"
          aria-label={previousPageLabel}
          disabled={current <= 1 || totalItems === 0}
          onClick={() => onPageChange(current - 1)}
          className={`flex items-center justify-center border-l border-border transition-colors hover:bg-surface-hover ${focusRing} ${disabledButton} ${config.button} ${config.height}`}
        >
          <CaretLeftIcon className={config.icon} />
        </button>
        <button
          type="button"
          aria-label={nextPageLabel}
          disabled={current >= pages || totalItems === 0}
          onClick={() => onPageChange(current + 1)}
          className={`flex items-center justify-center border-l border-border transition-colors hover:bg-surface-hover ${focusRing} ${disabledButton} ${config.button} ${config.height}`}
        >
          <CaretRightIcon className={config.icon} />
        </button>
      </div>
    </div>
  );
}
