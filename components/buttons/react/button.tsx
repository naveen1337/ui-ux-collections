/**
 * Component: Button
 * Design system: IBM Carbon Design System
 * Variants: primary | secondary | tertiary | ghost | danger, icon-only, sm/md/lg
 * Usage: standard action buttons. Pass `icon` for a trailing icon,
 * or `iconOnly` with `icon` (and an aria-label) for a square icon button.
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonKind = "primary" | "secondary" | "tertiary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ButtonKind;
  size?: ButtonSize;
  icon?: ReactNode;
  iconOnly?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 gap-2 text-xs",
  md: "h-12 px-4 gap-3 text-sm",
  lg: "h-16 px-8 gap-3 text-base",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const kindClasses: Record<ButtonKind, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "bg-surface-hover text-light hover:bg-secondary-hover",
  tertiary: "border border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:bg-surface-hover",
  danger: "bg-error text-white hover:bg-danger-hover",
};

const disabledClasses: Record<ButtonKind, string> = {
  primary: "disabled:bg-disabled disabled:text-muted",
  secondary: "disabled:bg-disabled disabled:text-muted",
  tertiary: "disabled:border-muted disabled:text-muted",
  ghost: "disabled:text-muted",
  danger: "disabled:bg-disabled disabled:text-muted",
};

export function Button({
  kind = "primary",
  size = "md",
  icon,
  iconOnly = false,
  className = "",
  children,
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps) {
  const base = iconOnly
    ? `inline-flex cursor-pointer items-center justify-center bg-surface-hover text-light hover:bg-secondary-hover ${iconOnlySizeClasses[size]}`
    : `inline-flex cursor-pointer items-center justify-center ${sizeClasses[size]} ${kindClasses[kind]}`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} tracking-tight transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed ${iconOnly ? "" : disabledClasses[kind]} ${className}`}
      {...rest}
    >
      {!iconOnly && children}
      {icon}
    </button>
  );
}
