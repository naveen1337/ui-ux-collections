/**
 * Component: Input
 * Design system: IBM Carbon Design System
 * Variants: xs/sm/md/lg, with-icon (left/right), disabled, invalid, success
 * Usage: single-line text entry. Pass `icon` for a leading icon,
 * `invalid` + `invalidText` for error state, `success` + `successText`
 * for validation feedback.
 */
import type { InputHTMLAttributes, ReactNode } from "react";
import { WarningIcon } from "../../icons/react/warning-icon";

export type InputSize = "xs" | "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  size?: InputSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  invalid?: boolean;
  invalidText?: string;
  success?: boolean;
  successText?: string;
}

const sizeClasses: Record<InputSize, string> = {
  xs: "h-6 px-2 text-xs border-b-[1.5px]",
  sm: "h-8 px-2 text-sm border-b-2",
  md: "h-10 px-3 text-sm border-b-[2.5px]",
  lg: "h-12 px-3 text-base border-b-[3px]",
};

const labelSizeClasses: Record<InputSize, string> = {
  xs: "mb-0.5 text-xs",
  sm: "mb-1 text-xs",
  md: "mb-1 text-sm",
  lg: "mb-1 text-sm",
};

const messageSizeClasses: Record<InputSize, string> = {
  xs: "mt-0.5 text-[0.6875rem]",
  sm: "mt-1 text-xs",
  md: "mt-1 text-xs",
  lg: "mt-1 text-sm",
};

const stateClasses = {
  default:
    "bg-surface border-border focus-within:border-primary hover:bg-surface-hover",
  disabled: "bg-disabled border-disabled cursor-not-allowed",
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

export function Input({
  label,
  helperText,
  size = "md",
  icon,
  iconPosition = "left",
  invalid = false,
  invalidText,
  success = false,
  successText,
  disabled = false,
  id,
  className = "",
  ...rest
}: InputProps) {
  const messageId = `${id}-message`;

  const state = disabled
    ? "disabled"
    : invalid
      ? "invalid"
      : success
        ? "success"
        : "default";

  const rightIcon = iconPosition === "right" ? icon : null;
  const leftIcon = iconPosition === "left" ? icon : null;

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
        className={`flex items-center ${sizeClasses[size]} ${stateClasses[state]} transition-colors duration-150`}
      >
        {leftIcon && <span className="mr-2 flex shrink-0 items-center text-muted">{leftIcon}</span>}
        <input
          id={id}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid || success ? messageId : undefined}
          className="h-full w-full bg-transparent tracking-tight outline-none placeholder:text-muted disabled:cursor-not-allowed disabled:text-muted"
          {...rest}
        />
        {rightIcon && <span className="ml-2 flex shrink-0 items-center text-muted">{rightIcon}</span>}
        {invalid && <WarningIcon className="ml-2 h-4 w-4 shrink-0 text-error" />}
        {success && !invalid && <CheckIcon className="ml-2 h-4 w-4 shrink-0 text-success" />}
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
