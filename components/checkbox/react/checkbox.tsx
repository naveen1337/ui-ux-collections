/**
 * Component: Checkbox
 * Design system: IBM Carbon Design System
 * Variants: default, checked, indeterminate, disabled, invalid
 * Usage: boolean selection in forms. Supports controlled and uncontrolled usage,
 * indeterminate state, helper and validation messages.
 */
import { useEffect, useId, useRef, type InputHTMLAttributes } from "react";
import { WarningIcon } from "../../icons/react/warning-icon";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label: string;
  helperText?: string;
  invalid?: boolean;
  invalidText?: string;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

function CheckMark({ indeterminate }: { indeterminate?: boolean }) {
  if (indeterminate) {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3 text-light">
        <path d="M3 8h10" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3 text-light">
      <path d="M6.5 10.6 3.9 8l-1 1 3.6 3.6 7-7-1-1z" fill="currentColor" />
    </svg>
  );
}

export function Checkbox({
  label,
  helperText,
  invalid = false,
  invalidText,
  indeterminate = false,
  disabled = false,
  id,
  className = "",
  checked,
  defaultChecked,
  onChange,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const showMessage = (invalid && invalidText) || helperText;
  const isChecked = checked ?? defaultChecked;
  const active = indeterminate || Boolean(isChecked);

  return (
    <div className={`text-light ${className}`}>
      <label
        htmlFor={inputId}
        className={`inline-flex items-start gap-2 ${disabled ? "cursor-not-allowed text-muted" : "cursor-pointer"}`}
      >
        <span className="relative mt-0.5 flex h-4 w-4 shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            aria-invalid={invalid || undefined}
            aria-describedby={showMessage ? messageId : undefined}
            className="peer sr-only"
            onChange={(e) => onChange?.(e.target.checked)}
            {...rest}
          />
          <span
            aria-hidden="true"
            className={`flex h-4 w-4 items-center justify-center border transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-light peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg ${
              disabled
                ? "border-subtle bg-subtle"
                : invalid
                  ? "border-error bg-transparent"
                  : active
                    ? "border-primary bg-primary"
                    : "border-border bg-transparent hover:border-primary"
            }`}
          >
            {(active || indeterminate) && !disabled && <CheckMark indeterminate={indeterminate} />}
            {(active || indeterminate) && disabled && (
              <span className="text-bg">{indeterminate ? "–" : "✓"}</span>
            )}
          </span>
        </span>
        <span className="text-sm leading-5">{label}</span>
      </label>
      {showMessage ? (
        <p
          id={messageId}
          className={`mt-1 flex items-center gap-1 pl-6 text-xs ${invalid ? "text-error" : "text-muted"}`}
        >
          {invalid && invalidText ? (
            <>
              <WarningIcon className="h-3.5 w-3.5 shrink-0" />
              <span>{invalidText}</span>
            </>
          ) : (
            helperText
          )}
        </p>
      ) : null}
    </div>
  );
}
