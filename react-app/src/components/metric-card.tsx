import { useState } from "react";
import type { ReactNode } from "react";
import { WarningIcon } from "./icons/warning-icon";
import { KebabIcon } from "./icons/kebab-icon";
import { ArrowUpIcon } from "./icons/arrow-up-icon";
import { ArrowDownIcon } from "./icons/arrow-down-icon";

export type MetricCardAccent = "primary" | "secondary" | "success" | "warning" | "error";
export type MetricCardTrend = "up" | "down";
export type MetricCardTheme = "dark" | "light";

export interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  change?: string;
  trend?: MetricCardTrend;
  caption?: string;
  alert?: boolean;
  menuItems?: string[];
  accent?: MetricCardAccent;
  theme?: MetricCardTheme;
  onClick?: () => void;
}

const accentValue: Record<MetricCardAccent, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

export function MetricCard({
  title,
  value,
  unit,
  change,
  trend,
  caption,
  alert,
  menuItems,
  accent,
  theme = "dark",
  onClick,
}: MetricCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const interactive = typeof onClick === "function";

  const surface =
    theme === "dark"
      ? "bg-surface text-subtle hover:bg-surface-hover"
      : "bg-white text-gray-700 shadow-sm hover:shadow-md";

  const titleColor = theme === "dark" ? "text-light" : "text-gray-900";
  const valueColor = theme === "dark" ? "text-light" : "text-gray-900";
  const captionColor = theme === "dark" ? "text-muted" : "text-gray-500";
  const menuColor = theme === "dark" ? "text-subtle" : "text-gray-600";
  const menuPanel =
    theme === "dark"
      ? "bg-bg border-border"
      : "bg-white border-gray-200";

  const trendColor = trend === "down" ? "text-error" : "text-success";
  const TrendIcon = trend === "down" ? ArrowDownIcon : ArrowUpIcon;

  const valueClasses = `text-4xl font-light leading-none tracking-tight tabular-nums ${
    accent ? accentValue[accent] : valueColor
  }`;

  return (
    <div
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`relative flex min-h-36 flex-col gap-2 p-5 outline-none transition-colors ${surface} ${
        interactive ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-primary" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${titleColor}`}>{title}</span>
          {alert && <WarningIcon className="h-4 w-4 text-warning" />}
        </div>
        {menuItems && menuItems.length > 0 && (
          <div className="relative">
            <button
              type="button"
              aria-label="Options"
              aria-expanded={menuOpen}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((open) => !open);
              }}
              className={`rounded-sm p-1 transition-colors hover:bg-border focus-visible:ring-2 focus-visible:ring-primary ${menuColor}`}
            >
              <KebabIcon />
            </button>
            {menuOpen && (
              <ul
                className={`absolute top-9 right-0 z-10 min-w-40 border py-1 ${menuPanel}`}
              >
                {menuItems.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                        theme === "dark"
                          ? "text-light hover:bg-surface-hover"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 pt-1">
        <span className={valueClasses}>{value}</span>
        {unit && (
          <span className={`text-sm ${captionColor}`}>{unit}</span>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs">
        {change && (
          <span className={`flex items-center gap-1 font-medium ${trendColor}`}>
            {change} <TrendIcon className="h-2.5 w-2.5" />
          </span>
        )}
        {caption && (
          <span className={captionColor}>{caption}</span>
        )}
      </div>
    </div>
  );
}

export function MetricCardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
