/**
 * Component: Tag
 * Design system: IBM Carbon Design System (building-blocks/core/components/tag)
 * Variants: read-only | dismissible | selectable | operational
 * Sizes: sm (18px) | md (24px, default) | lg (32px)
 * Colors: gray | blue | purple | green | yellow | red | cyan (read-only, dismissible, operational)
 * Usage:
 *  - read-only: labels and categories, no interaction.
 *  - dismissible: pass `onDismiss`. The close button removes the tag. Set `dismissLabel` for the aria-label.
 *  - selectable: toggles between selected and unselected. Use `selected` + `onSelectedChange`, or `defaultSelected`.
 *  - operational: pass `onOperate` to disclose more tags (popover, modal, breadcrumb detail view).
 *  - `icon` renders a decorative icon before the title (avoid in sm).
 *  - `skeleton` renders a loading placeholder.
 */
import { useState, type ReactNode } from "react";
import { CloseIcon } from "../../icons/react/close-icon";

export type TagKind = "read-only" | "dismissible" | "selectable" | "operational";
export type TagSize = "sm" | "md" | "lg";
export type TagColor = "gray" | "blue" | "purple" | "green" | "yellow" | "red" | "cyan";

export interface TagProps {
  kind?: TagKind;
  size?: TagSize;
  color?: TagColor;
  icon?: ReactNode;
  disabled?: boolean;
  skeleton?: boolean;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  onDismiss?: () => void;
  onOperate?: () => void;
  dismissLabel?: string;
  className?: string;
  children?: ReactNode;
}

const sizeClasses: Record<TagSize, string> = {
  sm: "h-4.5 gap-1 px-1.5 text-xs",
  md: "h-6 gap-1.5 px-2 text-xs",
  lg: "h-8 gap-2 px-3 text-sm",
};

const skeletonSizeClasses: Record<TagSize, string> = {
  sm: "h-4.5 w-14",
  md: "h-6 w-20",
  lg: "h-8 w-24",
};

// Read-only, dismissible and operational colors use the collection's palette tokens.
const colorClasses: Record<TagColor, string> = {
  gray: "bg-surface-hover text-light",
  blue: "bg-primary/25 text-light",
  purple: "bg-secondary/25 text-light",
  green: "bg-success/25 text-light",
  yellow: "bg-warning/30 text-light",
  red: "bg-error/25 text-light",
  cyan: "bg-info/25 text-light",
};

const disabledColorClass = "bg-disabled text-muted";

const focusClasses =
  "outline-none focus-visible:ring-2 focus-visible:ring-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const baseClasses =
  "inline-flex max-w-full shrink-0 items-center whitespace-nowrap align-middle font-normal leading-none";

const titleClasses = "min-w-0 truncate";

export function Tag({
  kind = "read-only",
  size = "md",
  color = "gray",
  icon,
  disabled = false,
  skeleton = false,
  selected,
  defaultSelected = false,
  onSelectedChange,
  onDismiss,
  onOperate,
  dismissLabel,
  className = "",
  children,
}: TagProps) {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const isSelected = selected ?? internalSelected;

  if (skeleton) {
    return (
      <span
        aria-hidden="true"
        className={`inline-block animate-pulse bg-surface-hover ${skeletonSizeClasses[size]} ${className}`}
      />
    );
  }

  const title = typeof children === "string" ? children : undefined;
  const titleNode = (
    <span className={titleClasses} title={title}>
      {children}
    </span>
  );

  if (kind === "selectable") {
    const toggle = () => {
      const next = !isSelected;
      if (selected === undefined) setInternalSelected(next);
      onSelectedChange?.(next);
    };

    const stateClasses = disabled
      ? "border-muted text-muted"
      : isSelected
        ? "border-primary bg-primary text-white"
        : "border-border text-light hover:bg-surface-hover";

    return (
      <button
        type="button"
        aria-pressed={isSelected}
        disabled={disabled}
        onClick={toggle}
        className={`${baseClasses} ${sizeClasses[size]} border ${stateClasses} cursor-pointer disabled:cursor-not-allowed ${focusClasses} ${className}`}
      >
        {icon}
        {titleNode}
      </button>
    );
  }

  if (kind === "operational") {
    const stateClasses = disabled
      ? "border-muted text-muted"
      : "border-border text-light hover:bg-surface-hover";

    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onOperate}
        className={`${baseClasses} ${sizeClasses[size]} border ${stateClasses} cursor-pointer disabled:cursor-not-allowed ${focusClasses} ${className}`}
      >
        {icon}
        {titleNode}
      </button>
    );
  }

  const colorClass = disabled ? disabledColorClass : colorClasses[color];

  if (kind === "dismissible") {
    return (
      <span className={`${baseClasses} ${sizeClasses[size]} ${colorClass} ${className}`}>
        {icon}
        {titleNode}
        <button
          type="button"
          aria-label={dismissLabel ?? "Dismiss tag"}
          disabled={disabled}
          onClick={onDismiss}
          className={`inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center hover:bg-surface-hover disabled:cursor-not-allowed ${focusClasses}`}
        >
          <CloseIcon className="h-3.5 w-3.5" />
        </button>
      </span>
    );
  }

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${colorClass} ${className}`}>
      {icon}
      {titleNode}
    </span>
  );
}
