import { useEffect, useId, useRef, useState } from "react";
import { WarningIcon } from "../../icons/react/warning-icon";

export type SingleSelectOption = {
  value: string;
  label: string;
};

export interface SingleSelectProps {
  label?: string | null;
  options: SingleSelectOption[];
  selected: string | null;
  onChange: (selected: string | null) => void;
  size?: "sm" | "md";
  placeholder?: string;
  clearLabel?: string;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
  warn?: boolean;
  warnText?: string;
  readOnly?: boolean;
  className?: string;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M6.5 10.6 3.9 8l-1 1 3.6 3.6 7-7-1-1z" fill="currentColor" />
    </svg>
  );
}

function WarningFilledIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm-2 7h4v10h-4Zm0 13h4v4h-4Z" />
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

export function SingleSelect({
  label,
  options,
  selected,
  onChange,
  size = "md",
  placeholder = "Choose an option",
  clearLabel = "Clear",
  disabled = false,
  invalid = false,
  invalidText,
  warn = false,
  warnText,
  readOnly = false,
  className,
}: SingleSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listBoxId = useId();

  const selectedOption = options.find((o) => o.value === selected) ?? null;

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
    const index = selectedOption ? options.findIndex((o) => o.value === selectedOption.value) : -1;
    setActiveIndex(index);
    setOpen(true);
  }

  function choose(value: string) {
    onChange(value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onKeyDownTrigger(e: React.KeyboardEvent) {
    if (disabled || readOnly) return;
    if (open) {
      onKeyDownList(e);
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
      case "Escape":
        setOpen(false);
        break;
    }
  }

  function onKeyDownList(e: React.KeyboardEvent) {
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
    }
  }

  const sm = size === "sm";
  const showWarning = warn && !invalid;

  if (readOnly) {
    return (
      <div className={`text-light ${className ?? ""}`}>
        {label != null && (
          <span id={`${listBoxId}-label`} className={`block text-sm text-muted ${sm ? "mb-0.5" : "mb-1"}`}>
            {label}
          </span>
        )}
        <div
          aria-labelledby={label != null ? `${listBoxId}-label` : undefined}
          className={`flex ${sm ? "h-8 px-3 text-sm" : "h-12 px-4 text-base"} w-full cursor-default items-center border-b border-border`}
        >
          <span className="min-w-0 flex-1 truncate">
            {selectedOption ? selectedOption.label : <span className="text-muted">No option selected</span>}
          </span>
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted" />
        </div>
      </div>
    );
  }

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
            : warn
              ? "border-b-2 border-b-warning border-border hover:bg-surface-hover"
              : open
                ? "border-2 border-primary"
                : "border-border hover:bg-surface-hover"
        }`}
      >
        <span
          id={`${listBoxId}-value`}
          className="min-w-0 flex-1 truncate"
          title={selectedOption ? selectedOption.label : undefined}
        >
          {selectedOption ? selectedOption.label : <span className="text-muted">{placeholder}</span>}
        </span>
        {invalid && <WarningFilledIcon className="h-4 w-4 shrink-0 text-error" />}
        {showWarning && <WarningIcon className="h-4 w-4 shrink-0 text-warning" />}
        <ChevronIcon className={`h-4 w-4 shrink-0 transition-transform ${open ? "" : "rotate-180"}`} />
      </button>

      {invalid && invalidText && <p className="mt-1 text-xs text-error">{invalidText}</p>}
      {showWarning && warnText && <p className="mt-1 text-xs text-warning">{warnText}</p>}

      {open && (
        <div
          className="absolute z-10 mt-1 w-full border border-surface-hover bg-surface shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
          role="combobox"
          aria-expanded
          aria-owns={listBoxId}
          aria-controls={listBoxId}
        >
          {selectedOption && (
            <div className={`flex justify-end border-b border-surface-hover px-3 ${sm ? "py-1" : "py-1.5"}`}>
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
                className="text-sm text-primary underline-offset-2 hover:underline"
              >
                {clearLabel}
              </button>
            </div>
          )}

          <ul
            id={listBoxId}
            role="listbox"
            aria-label={label ?? undefined}
            className="max-h-64 overflow-y-auto py-1"
          >
            {options.map((option, index) => {
              const checked = option.value === selected;
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
                  onClick={() => choose(option.value)}
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center">
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
