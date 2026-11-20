/**
 * Component: Accordion
 * Design system: IBM Carbon Design System
 * Variants: sm/md/lg sizes, align-start/align-end (chevron position), items with optional icon
 * Usage: vertically stacked expand/collapse sections. Pass `items` with title/content and optional icon.
 */
import { useState, type ReactNode } from "react";
import { ChevronDownIcon } from "../../icons/react/chevron-down-icon";

export type AccordionSize = "sm" | "md" | "lg";
export type AccordionAlign = "start" | "end";

export interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  size?: AccordionSize;
  align?: AccordionAlign;
  defaultOpenIds?: string[];
  className?: string;
}

const sizeConfig = {
  sm: {
    heading: "min-h-8 gap-2 px-4 py-1.5 text-xs",
    content: "pb-4 pt-1 text-xs",
    icon: "h-4 w-4",
    chevron: "h-4 w-4",
  },
  md: {
    heading: "min-h-10 gap-3 px-4 py-2.5 text-sm",
    content: "pb-6 pt-1 text-sm",
    icon: "h-4 w-4",
    chevron: "h-4 w-4",
  },
  lg: {
    heading: "min-h-12 gap-3 px-4 py-3 text-base",
    content: "pb-6 pt-2 text-base",
    icon: "h-5 w-5",
    chevron: "h-5 w-5",
  },
} as const;

export function Accordion({
  items,
  size = "md",
  align = "start",
  defaultOpenIds = [],
  className = "",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(defaultOpenIds),
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const config = sizeConfig[size];

  return (
    <div className={`w-full ${className}`}>
      {items.map((item) => {
        const open = openIds.has(item.id);
        const contentId = `${item.id}-content`;
        const buttonId = `${item.id}-header`;
        const indent =
          align === "end"
            ? "pl-4 pr-12"
            : item.icon
              ? "pl-[4.5rem] pr-4"
              : "pl-11 pr-4";

        return (
          <div key={item.id} className="border-t border-border last:border-b">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={contentId}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
                className={`flex w-full items-center text-left text-light transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-transparent ${config.heading} ${
                  align === "end" ? "flex-row-reverse justify-between" : ""
                }`}
              >
                <ChevronDownIcon
                  className={`shrink-0 text-light transition-transform duration-150 ${config.chevron} ${
                    open ? "rotate-180" : ""
                  } ${item.disabled ? "text-muted" : ""}`}
                />
                {item.icon && (
                  <span
                    className={`flex shrink-0 items-center text-light ${config.icon} ${
                      item.disabled ? "text-muted" : ""
                    }`}
                  >
                    {item.icon}
                  </span>
                )}
                <span className="min-w-0 flex-1">{item.title}</span>
              </button>
            </h3>
            <div
              id={contentId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-150 ease-in-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className={`text-subtle ${config.content} ${indent}`}>
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
