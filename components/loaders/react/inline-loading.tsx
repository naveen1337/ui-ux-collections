/**
 * Component: InlineLoading
 * Design system: IBM Carbon Design System (building-blocks/core/components/inline-loading)
 * Usage:
 *  - `status` drives the visual state:
 *      - `active` (default): spinner + `description`
 *      - `finished`: success icon + `successDescription`
 *      - `error`: error icon + `errorDescription`
 *      - `inactive`: `description` only, no icon
 *  - The text is announced via `role="status"` (polite live region).
 *  - Spinner is decorative (`aria-hidden`); the description carries the meaning.
 */
import type { ReactNode } from "react";
import { CheckmarkIcon } from "../../icons/react/checkmark-icon";
import { ErrorIcon } from "../../icons/react/error-icon";

export type InlineLoadingStatus = "active" | "inactive" | "finished" | "error";

export interface InlineLoadingProps {
  status?: InlineLoadingStatus;
  description?: ReactNode;
  successDescription?: ReactNode;
  errorDescription?: ReactNode;
  className?: string;
}

const iconWrapperClasses = "inline-flex h-4 w-4 shrink-0 items-center justify-center";

const spinnerClasses =
  "h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary";

const textClasses = "text-sm leading-5 text-light";

export function InlineLoading({
  status = "active",
  description = "Loading...",
  successDescription = "Success",
  errorDescription = "Error",
  className = "",
}: InlineLoadingProps) {
  let icon: ReactNode = null;
  let text: ReactNode = description;

  switch (status) {
    case "active":
      icon = <span aria-hidden="true" className={spinnerClasses} />;
      break;
    case "finished":
      icon = <CheckmarkIcon className="h-4 w-4 text-success" />;
      text = successDescription;
      break;
    case "error":
      icon = <ErrorIcon className="h-4 w-4 text-error" />;
      text = errorDescription;
      break;
    case "inactive":
      break;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      data-status={status}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {icon && <span className={iconWrapperClasses}>{icon}</span>}
      <span className={textClasses}>{text}</span>
    </div>
  );
}
