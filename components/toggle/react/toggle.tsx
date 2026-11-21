/**
 * Component: Toggle
 * Design system: IBM Carbon Design System
 * Variants: sm, md, on, off, disabled
 * Usage: binary on/off switch for immediate settings. Prefer checkbox for
 * form submissions that require explicit save.
 */
import { useId, useState, type ButtonHTMLAttributes } from "react";

export type ToggleSize = "sm" | "md";

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type" | "onToggle"> {
  label?: string;
  labelA?: string;
  labelB?: string;
  toggled?: boolean;
  defaultToggled?: boolean;
  size?: ToggleSize;
  hideLabel?: boolean;
  onToggle?: (toggled: boolean) => void;
}

export function Toggle({
  label,
  labelA = "Off",
  labelB = "On",
  toggled,
  defaultToggled = false,
  size = "md",
  hideLabel = false,
  disabled = false,
  id,
  className = "",
  onToggle,
  ...rest
}: ToggleProps) {
  const autoId = useId();
  const toggleId = id ?? autoId;
  const labelId = `${toggleId}-label`;
  const stateId = `${toggleId}-state`;
  const [internal, setInternal] = useState(defaultToggled);
  const controlled = typeof toggled === "boolean";
  const isOn = controlled ? toggled : internal;

  function handleClick() {
    if (disabled) return;
    const next = !isOn;
    if (!controlled) setInternal(next);
    onToggle?.(next);
  }

  const track = size === "sm" ? "h-4 w-8" : "h-6 w-12";
  const thumb =
    size === "sm"
      ? `h-3 w-3 top-0.5 ${isOn ? "left-[1.125rem]" : "left-0.5"}`
      : `h-[1.125rem] w-[1.125rem] top-[0.1875rem] ${isOn ? "left-[1.625rem]" : "left-[0.1875rem]"}`;

  return (
    <div className={`inline-flex flex-col text-light ${className}`}>
      {label && !hideLabel && (
        <span id={labelId} className={`mb-2 text-sm ${disabled ? "text-muted" : "text-light"}`}>
          {label}
        </span>
      )}
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-labelledby={label && !hideLabel ? labelId : undefined}
        aria-label={label && hideLabel ? label : undefined}
        disabled={disabled}
        onClick={handleClick}
        className={`group inline-flex items-center gap-3 text-left outline-none ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={`relative inline-flex shrink-0 items-center rounded-full border transition-colors duration-150 group-focus-visible:ring-2 group-focus-visible:ring-light group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-bg ${track} ${
            disabled
              ? "border-disabled bg-disabled"
              : isOn
                ? "border-success bg-success"
                : "border-border bg-border group-hover:bg-muted"
          }`}
        >
          <span
            className={`absolute rounded-full transition-all duration-150 ${thumb} ${disabled ? "bg-muted" : "bg-light"}`}
          />
        </span>
        <span id={stateId} className={`text-sm ${disabled ? "text-muted" : "text-light"}`}>
          {isOn ? labelB : labelA}
        </span>
      </button>
    </div>
  );
}
