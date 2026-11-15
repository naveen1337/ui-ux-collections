import { useEffect, useId, useMemo, useRef, useState } from "react";

export type MultiSelectOption = {
  value: string;
  label: string;
};

export interface MultiSelectProps {
  label?: string | null;
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  size?: "sm" | "md";
  placeholder?: string;
  searchPlaceholder?: string;
  clearLabel?: string;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
  className?: string;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M6.5 10.6 3.9 8l-1 1 3.6 3.6 7-7-1-1z" fill="currentColor" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M15 14.5 10.4 10a5.5 5.5 0 1 0-.4.4L14.5 15zM6.5 11a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M8 11 3 6l.7-.7L8 9.6l4.3-4.3.7.7z" fill="currentColor" />
    </svg>
  );
}

export function MultiSelect({
  label,
  options,
  selected,
  onChange,
  size = "md",
  placeholder = "Choose options",
  searchPlaceholder = "Filter",
  clearLabel = "Clear",
  disabled = false,
  invalid = false,
  invalidText,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listBoxId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const selectedLabels = useMemo(
    () => options.filter((o) => selectedSet.has(o.value)).map((o) => o.label),
    [options, selectedSet],
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

  function openMenu() {
    setQuery("");
    setActiveIndex(-1);
    setOpen(true);
  }

  function toggle(value: string) {
    onChange(selectedSet.has(value) ? selected.filter((v) => v !== value) : [...selected, value]);
  }

  function onKeyDownTrigger(e: React.KeyboardEvent) {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
      case "Enter":
      case " ":
        e.preventDefault();
        openMenu();
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  }

  function onKeyDownList(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ": {
        e.preventDefault();
        const option = filtered[activeIndex];
        if (option) toggle(option.value);
        break;
      }
    }
  }

  const summary = selectedLabels.join(", ");
  const hasSelection = selected.length > 0;
  const sm = size === "sm";

  return (
    <div ref={rootRef} className={`relative text-light ${className ?? ""}`}>
      {label != null && (
        <span
          id={`${listBoxId}-label`}
          className={`block text-sm text-muted ${sm ? "mb-0.5" : "mb-1"}`}
        >
          {label}
        </span>
      )}

      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${listBoxId}-label ${listBoxId}-value`}
        aria-invalid={invalid || undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDownTrigger}
        className={`flex ${sm ? "h-8 px-3 text-sm" : "h-12 px-4 text-base"} w-full items-center gap-2 border text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          invalid
            ? "border-2 border-error"
            : open
              ? "border-2 border-primary"
              : "border-border hover:bg-surface-hover"
        }`}
      >
        <span
          id={`${listBoxId}-value`}
          className="min-w-0 flex-1 truncate"
          title={hasSelection ? summary : undefined}
        >
          {hasSelection ? summary : <span className="text-muted">{placeholder}</span>}
        </span>
        {hasSelection && (
          <span
            className={`flex shrink-0 items-center justify-center rounded-full bg-primary font-medium text-light ${
              sm ? "h-5 min-w-5 px-1 text-[0.6875rem]" : "h-6 min-w-6 px-1.5 text-xs"
            }`}
            aria-label={`${selected.length} selected`}
          >
            {selected.length}
          </span>
        )}
        <ChevronIcon className={`h-4 w-4 shrink-0 transition-transform ${open ? "" : "rotate-180"}`} />
      </button>

      {invalid && invalidText && <p className="mt-1 text-xs text-error">{invalidText}</p>}

      {open && (
        <div
          className="absolute z-10 mt-1 w-full border border-surface-hover bg-surface shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
          role="combobox"
          aria-expanded
          aria-owns={listBoxId}
          aria-controls={listBoxId}
        >
          <div className="flex items-center gap-2 border-b border-surface-hover px-3">
            <SearchIcon className="h-4 w-4 shrink-0 text-muted" />
            <input
              ref={searchRef}
              type="text"
              role="searchbox"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={onKeyDownList}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              autoFocus
              className={`${sm ? "h-8" : "h-10"} w-full bg-transparent text-sm outline-none placeholder:text-muted`}
            />
          </div>

          {hasSelection && (
            <div className={`flex justify-end border-b border-surface-hover px-3 ${sm ? "py-1" : "py-1.5"}`}>
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-sm text-primary underline-offset-2 hover:underline"
              >
                {clearLabel} ({selected.length})
              </button>
            </div>
          )}

          <ul
            id={listBoxId}
            role="listbox"
            aria-multiselectable
            aria-label={label ?? undefined}
            className="max-h-64 overflow-y-auto py-1"
          >
            {filtered.length === 0 && (
              <li className={`${sm ? "px-3 py-2" : "px-4 py-3"} text-sm text-muted`}>
                No matches found
              </li>
            )}
            {filtered.map((option, index) => {
              const checked = selectedSet.has(option.value);
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={checked}
                  className={`flex cursor-pointer items-center ${sm ? "gap-2 px-3 py-1.5" : "gap-3 px-4 py-2.5"} text-sm hover:bg-surface-hover ${
                    index === activeIndex || checked ? "bg-surface-hover" : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex((i) => (i === index ? -1 : i))}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggle(option.value)}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                      checked ? "border-primary bg-primary" : "border-border bg-transparent"
                    }`}
                  >
                    {checked && <CheckIcon className="h-4 w-4 text-light" />}
                  </span>
                  <span className="truncate">{option.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
