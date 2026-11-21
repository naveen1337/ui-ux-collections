/**
 * Component: Breadcrumb
 * Design system: IBM Carbon Design System (building-blocks/core/components/breadcrumb)
 * Usage:
 *  - Pass `items` in order from root to current page.
 *  - Items with `href` or `onSelect` render as links. Items without either render as plain text.
 *  - The last item is the current page: it gets `aria-current="page"` and is never a link.
 *  - `onNavigate` fires for every link click (receives the item), useful for client-side routing.
 *  - Separators (/) sit between items only.
 */
import type { ReactNode } from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onSelect?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (item: BreadcrumbItem) => void;
  ariaLabel?: string;
  className?: string;
}

const linkClasses =
  "text-primary cursor-pointer hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm";

const currentClasses = "text-light";

export function Breadcrumb({
  items,
  onNavigate,
  ariaLabel = "Breadcrumb",
  className = "",
}: BreadcrumbProps) {
  return (
    <nav aria-label={ariaLabel} className={className}>
      <ol className="flex flex-wrap items-center text-sm leading-5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isLink = !isLast && (item.href !== undefined || item.onSelect !== undefined);

          const handleClick = () => {
            item.onSelect?.();
            onNavigate?.(item);
          };

          return (
            <li key={index} className="flex items-center">
              {isLink ? (
                <a
                  href={item.href}
                  onClick={(event) => {
                    if (!item.href) event.preventDefault();
                    handleClick();
                  }}
                  className={linkClasses}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? currentClasses : "text-muted"}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="mx-2 text-muted">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
