/**
 * Component: Notification
 * Design system: IBM Carbon Design System (building-blocks/core/components/notification)
 * Variants: inline | toast | callout (+ actionable via `action` on inline/toast)
 * Statuses: informational | success | warning | error (callout: informational | warning only)
 * Usage:
 *  - inline: task-flow feedback near the related content or at the top of a content
 *    area. Persists until the user dismisses it; the close button renders when
 *    `onDismiss` is passed (omit it when the message is critical).
 *  - toast: fixed-width feedback that stacks at the top right of the screen, spaced
 *    0.5rem apart. Optional `caption` renders a timestamp at the bottom. Pass
 *    `timeoutMs` (5000 per guidelines) to auto-dismiss; ignored when `action` is
 *    set — actionable toasts persist until the user dismisses them.
 *  - callout: non-dismissable guidance that loads with the page. No close or
 *    action buttons; use `link` for additional context. Title can be omitted.
 *  - `action` makes inline/toast actionable: ghost button (inline) or tertiary
 *    button (toast). Only one action per notification.
 *  - `lowContrast` (default true) renders the tinted style; false renders the
 *    high-contrast style. Never mix styles within a variant.
 *  - error notifications are announced assertively (role="alert"), the other
 *    statuses politely (role="status"). Esc dismisses while focus is inside a
 *    dismissible notification.
 */
import { useEffect, type KeyboardEvent, type ReactNode } from "react";
import { CheckmarkIcon } from "../../icons/react/checkmark-icon";
import { CloseIcon } from "../../icons/react/close-icon";
import { ErrorIcon } from "../../icons/react/error-icon";
import { InformationIcon } from "../../icons/react/information-icon";
import { WarningIcon } from "../../icons/react/warning-icon";

export type NotificationVariant = "inline" | "toast" | "callout";
export type NotificationStatus = "informational" | "success" | "warning" | "error";

export interface NotificationAction {
  label: string;
  onClick?: () => void;
}

export interface NotificationLink {
  label: string;
  href: string;
}

export interface NotificationProps {
  variant?: NotificationVariant;
  status?: NotificationStatus;
  title?: ReactNode;
  children?: ReactNode;
  caption?: ReactNode;
  action?: NotificationAction;
  link?: NotificationLink;
  lowContrast?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  timeoutMs?: number;
  className?: string;
}

const statusIconClasses: Record<NotificationStatus, string> = {
  informational: "text-primary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

// Low-contrast tinted surfaces, mirroring the tag palette treatment.
const statusLowBgClasses: Record<NotificationStatus, string> = {
  informational: "bg-primary/25",
  success: "bg-success/25",
  warning: "bg-warning/30",
  error: "bg-error/25",
};

const statusBorderClasses: Record<NotificationStatus, string> = {
  informational: "border-primary",
  success: "border-success",
  warning: "border-warning",
  error: "border-error",
};

const statusIcons: Record<NotificationStatus, typeof InformationIcon> = {
  informational: InformationIcon,
  success: CheckmarkIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

const focusClasses =
  "outline-none focus-visible:ring-2 focus-visible:ring-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const titleClasses = "text-sm font-semibold leading-5";
const bodyClasses = "text-sm leading-5 text-light";

export function Notification({
  variant = "inline",
  status = "informational",
  title,
  children,
  caption,
  action,
  link,
  lowContrast = true,
  onDismiss,
  dismissLabel,
  timeoutMs,
  className = "",
}: NotificationProps) {
  const Icon = statusIcons[status];
  const dismissible = variant !== "callout" && Boolean(onDismiss);

  useEffect(() => {
    if (variant !== "toast" || !timeoutMs || action || !onDismiss) return;
    const timer = setTimeout(() => onDismiss(), timeoutMs);
    return () => clearTimeout(timer);
  }, [variant, timeoutMs, action, onDismiss]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && dismissible) onDismiss?.();
  };

  const surfaceClasses = lowContrast ? statusLowBgClasses[status] : "bg-surface-hover";

  const linkNode = link && (
    <a
      href={link.href}
      className={`w-fit text-sm leading-5 text-light underline underline-offset-2 transition-colors hover:text-subtle ${focusClasses}`}
    >
      {link.label}
    </a>
  );

  const actionNode = action ? (
    variant === "toast" ? (
      <button
        type="button"
        onClick={action.onClick}
        className={`inline-flex h-8 w-fit cursor-pointer items-center border border-light px-3 text-xs text-light transition-colors hover:bg-surface-hover disabled:cursor-not-allowed ${focusClasses}`}
      >
        {action.label}
      </button>
    ) : (
      <button
        type="button"
        onClick={action.onClick}
        className={`-ml-2 inline-flex h-8 w-fit cursor-pointer items-center px-2 text-sm text-light transition-colors hover:bg-surface-hover disabled:cursor-not-allowed ${focusClasses}`}
      >
        {action.label}
      </button>
    )
  ) : null;

  const closeButton = dismissible ? (
    <button
      type="button"
      aria-label={dismissLabel ?? "Close notification"}
      onClick={onDismiss}
      className={`-mr-1 inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center transition-colors hover:bg-surface-hover ${focusClasses}`}
    >
      <CloseIcon className="h-4 w-4" />
    </button>
  ) : null;

  if (variant === "toast") {
    return (
      <div
        role={status === "error" ? "alert" : "status"}
        data-variant="toast"
        data-status={status}
        onKeyDown={handleKeyDown}
        className={`flex w-72 flex-col gap-1.5 px-4 py-3.5 ${surfaceClasses} ${className}`}
      >
        <div className="flex items-start gap-2">
          <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${statusIconClasses[status]}`} />
          {title && <span className={`min-w-0 flex-1 ${titleClasses}`}>{title}</span>}
          {closeButton}
        </div>
        <div className="flex flex-col items-start gap-1.5 pl-6">
          {children && <div className={bodyClasses}>{children}</div>}
          {linkNode}
          {actionNode}
          {caption && <span className="text-xs text-muted">{caption}</span>}
        </div>
      </div>
    );
  }

  if (variant === "callout") {
    return (
      <div
        data-variant="callout"
        data-status={status}
        className={`flex items-start gap-3 border-l-4 py-3.5 pl-4 pr-4 ${statusBorderClasses[status]} ${surfaceClasses} ${className}`}
      >
        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${statusIconClasses[status]}`} />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
          {title && <span className={titleClasses}>{title}</span>}
          {children && <div className={bodyClasses}>{children}</div>}
          {linkNode}
        </div>
      </div>
    );
  }

  return (
    <div
      role={status === "error" ? "alert" : "status"}
      data-variant="inline"
      data-status={status}
      onKeyDown={handleKeyDown}
      className={`flex min-h-12 items-start gap-3 px-4 py-3 ${surfaceClasses} ${className}`}
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${statusIconClasses[status]}`} />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        {title && <span className={titleClasses}>{title}</span>}
        {children && <div className={bodyClasses}>{children}</div>}
        {linkNode}
        {actionNode}
      </div>
      {closeButton}
    </div>
  );
}
