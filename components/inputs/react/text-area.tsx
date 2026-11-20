/**
 * Component: TextArea
 * Design system: IBM Carbon Design System
 * Variants: xs/sm/md/lg, disabled, invalid, success
 * Usage: multi-line text entry. Pass `invalid` + `invalidText` for error
 * state, `success` + `successText` for validation feedback.
 */
import type { ReactNode, TextareaHTMLAttributes } from "react";
import { WarningIcon } from "../../icons/react/warning-icon";

export type TextAreaSize = "xs" | "sm" | "md" | "lg";

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  helperText?: string;
  size?: TextAreaSize;
  invalid?: boolean;
  invalidText?: string;
  success?: boolean;
  successText?: string;
}

const sizeClasses: Record<TextAreaSize, string> = {
  xs: "min-h-6 px-2 py-1 text-xs border-b-[1.5px]",
  sm: "min-h-8 px-2 py-1.5 text-sm border-b-2",
  md: "min-h-10 px-3 py-2 text-sm border-b-[2.5px]",
  lg: "min-h-12 px-3 py-2.5 text-base border-b-[3px]",
};

const labelSizeClasses: Record<TextAreaSize, string> = {
  xs: "mb-0.5 text-xs",
  sm: "mb-1 text-xs",
  md: "mb-1 text-sm",
  lg: "mb-1 text-sm",
};

const messageSizeClasses: Record<TextAreaSize, string> = {
  xs: "mt-0.5 text-[0.6875rem]",
  sm: "mt-1 text-xs",
  md: "mt-1 text-xs",
  lg: "mt-1 text-sm",
};

const stateClasses = {
  default:
    "bg-surface border-border focus-within:border-primary hover:bg-surface-hover",
  disabled: "bg-subtle border-subtle cursor-not-allowed",
  invalid: "bg-surface border-error hover:bg-surface-hover",
  success: "bg-surface border-success hover:bg-surface-hover",
} as const;

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M6.5 10.6 3.9 8l-1 1 3.6 3.6 7-7-1-1z" fill="currentColor" />
    </svg>
  );
}

export function TextArea({
  label,
  helperText,
  size = "md",
  invalid = false,
  invalidText,
  success = false,
  successText,
  disabled = false,
  id,
  className = "",
  rows = 4,
  ...rest
}: TextAreaProps) {
  const messageId = id ? `${id}-message` : undefined;

  const state = disabled
    ? "disabled"
    : invalid
      ? "invalid"
      : success
        ? "success"
        : "default";

  const statusIcon: ReactNode = invalid ? (
    <WarningIcon className="h-4 w-4 shrink-0 text-error" />
  ) : success ? (
    <CheckIcon className="h-4 w-4 shrink-0 text-success" />
  ) : null;

  return (
    <div className={`text-light ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-light ${labelSizeClasses[size]} ${disabled ? "text-muted" : ""}`}
        >
          {label}
        </label>
      )}

      <div
        className={`flex items-start ${sizeClasses[size]} ${stateClasses[state]} transition-colors duration-150`}
      >
        <textarea
          id={id}
          rows={rows}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid || success || helperText ? messageId : undefined}
          className="min-h-0 w-full resize-y bg-transparent tracking-tight outline-none placeholder:text-muted disabled:cursor-not-allowed disabled:resize-none disabled:text-muted"
          {...rest}
        />
        {statusIcon && <span className="ml-2 mt-0.5 flex shrink-0">{statusIcon}</span>}
      </div>

      {(invalid && invalidText) || (success && successText) || helperText ? (
        <p
          id={messageId}
          className={`${messageSizeClasses[size]} ${
            invalid ? "text-error" : success ? "text-success" : "text-muted"
          }`}
        >
          {(invalid && invalidText) || (success && successText) || helperText}
        </p>
      ) : null}
    </div>
  );
}
