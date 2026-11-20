/**
 * Component: RadioGroup
 * Design system: IBM Carbon Design System
 * Variants: vertical, horizontal, disabled, invalid
 * Usage: single selection from a set of mutually exclusive options.
 */
import { useId, type ReactNode } from "react";
import { WarningIcon } from "../../icons/react/warning-icon";

export type RadioGroupOption = {
  value: string;
  label: ReactNode;
  helperText?: string;
  disabled?: boolean;
};

export interface RadioGroupProps {
  legend?: string;
  name?: string;
  options: RadioGroupOption[];
  value?: string | null;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
  helperText?: string;
  className?: string;
}

export function RadioGroup({
  legend,
  name,
  options,
  value = null,
  onChange,
  orientation = "vertical",
  disabled = false,
  invalid = false,
  invalidText,
  helperText,
  className = "",
}: RadioGroupProps) {
  const autoId = useId();
  const groupName = name ?? autoId;
  const messageId = `${groupName}-message`;
  const showMessage = (invalid && invalidText) || helperText;

  return (
    <fieldset className={`m-0 min-w-0 border-0 p-0 text-light ${className}`}>
      {legend && (
        <legend className={`mb-2 text-sm ${disabled ? "text-muted" : "text-light"}`}>{legend}</legend>
      )}
      <div
        role="radiogroup"
        aria-invalid={invalid || undefined}
        aria-describedby={showMessage ? messageId : undefined}
        className={orientation === "horizontal" ? "flex flex-wrap gap-x-6 gap-y-3" : "flex flex-col gap-3"}
      >
        {options.map((option) => {
          const optionId = `${groupName}-${option.value}`;
          const isDisabled = disabled || option.disabled;
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`inline-flex items-start gap-2 ${isDisabled ? "cursor-not-allowed text-muted" : "cursor-pointer"}`}
            >
              <span className="relative mt-0.5 flex h-4 w-4 shrink-0">
                <input
                  id={optionId}
                  type="radio"
                  name={groupName}
                  value={option.value}
                  checked={checked}
                  disabled={isDisabled}
                  className="peer sr-only"
                  onChange={() => onChange?.(option.value)}
                />
                <span
                  aria-hidden="true"
                  className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-light peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg ${
                    isDisabled
                      ? "border-disabled bg-disabled"
                      : invalid
                        ? "border-error"
                        : checked
                          ? "border-primary"
                          : "border-border hover:border-primary"
                  }`}
                >
                  {checked && (
                    <span
                      className={`h-2 w-2 rounded-full ${isDisabled ? "bg-muted" : "bg-primary"}`}
                    />
                  )}
                </span>
              </span>
              <span className="flex flex-col">
                <span className="text-sm leading-5">{option.label}</span>
                {option.helperText && (
                  <span className="mt-0.5 text-xs text-muted">{option.helperText}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {showMessage ? (
        <p
          id={messageId}
          className={`mt-2 flex items-center gap-1 text-xs ${invalid ? "text-error" : "text-muted"}`}
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
    </fieldset>
  );
}
