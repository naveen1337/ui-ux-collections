import type { ReactNode } from "react";

export type ResourceCardAccent =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type ResourceCardTheme = "dark" | "light";

export interface ResourceCardProps {
  name: string;
  icon?: ReactNode;
  allocated?: string;
  used?: string;
  utilization?: string;
  usage: number;
  usageLabel?: string;
  limitLabel?: string;
  limitValue?: string;
  accent?: ResourceCardAccent;
  theme?: ResourceCardTheme;
}

const accentText: Record<ResourceCardAccent, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-info",
};

const accentBadge: Record<ResourceCardAccent, string> = {
  primary: "bg-primary text-bg",
  secondary: "bg-secondary text-bg",
  success: "bg-success text-bg",
  warning: "bg-warning text-bg",
  error: "bg-error text-bg",
  info: "bg-info text-bg",
};

const accentBar: Record<ResourceCardAccent, string> = {
  primary:
    "bg-[repeating-linear-gradient(90deg,var(--color-primary)_0_3px,transparent_3px_6px)]",
  secondary:
    "bg-[repeating-linear-gradient(90deg,var(--color-secondary)_0_3px,transparent_3px_6px)]",
  success:
    "bg-[repeating-linear-gradient(90deg,var(--color-success)_0_3px,transparent_3px_6px)]",
  warning:
    "bg-[repeating-linear-gradient(90deg,var(--color-warning)_0_3px,transparent_3px_6px)]",
  error:
    "bg-[repeating-linear-gradient(90deg,var(--color-error)_0_3px,transparent_3px_6px)]",
  info: "bg-[repeating-linear-gradient(90deg,var(--color-info)_0_3px,transparent_3px_6px)]",
};

export function ResourceUsageBar({
  usage,
  accent = "primary",
  theme = "dark",
  className = "",
}: Pick<ResourceCardProps, "usage" | "accent" | "theme"> & {
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, usage));
  const track = theme === "dark" ? "bg-surface-hover" : "bg-gray-200";

  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-5 w-full overflow-hidden ${track} ${className}`}
    >
      <div
        className={`h-full ${accentBar[accent]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ResourceCard({
  name,
  icon,
  allocated,
  used,
  utilization,
  usage,
  usageLabel = "Usage",
  limitLabel,
  limitValue,
  accent = "primary",
  theme = "dark",
}: ResourceCardProps) {
  const surface =
    theme === "dark" ? "bg-surface text-subtle" : "bg-white text-gray-700";
  const titleColor = theme === "dark" ? "text-light" : "text-gray-900";
  const mutedColor = theme === "dark" ? "text-muted" : "text-gray-500";
  const limitBadge =
    theme === "dark"
      ? "border-border text-subtle"
      : "border-gray-300 text-gray-700";

  return (
    <div className={`flex min-h-44 flex-col gap-4 p-5 font-mono ${surface}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {icon && <span className={accentText[accent]}>{icon}</span>}
          <span
            className={`text-xs font-semibold tracking-widest uppercase ${titleColor}`}
          >
            {name}
          </span>
        </div>
        {utilization && (
          <span
            className={`px-2 py-0.5 text-xs font-semibold tabular-nums ${accentBadge[accent]}`}
          >
            {utilization}
          </span>
        )}
      </div>

      {(allocated || used || utilization) && (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col gap-1">
            <span className={mutedColor}>Allocated</span>
            <span className={`tabular-nums ${titleColor}`}>{allocated}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className={mutedColor}>Used</span>
            <span className={`tabular-nums ${accentText[accent]}`}>{used}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className={mutedColor}>Utilization</span>
            <span className={`tabular-nums ${titleColor}`}>{utilization}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className={mutedColor}>{usageLabel}</span>
          <span className={`tabular-nums ${titleColor}`}>{usage}%</span>
        </div>
        <ResourceUsageBar usage={usage} accent={accent} theme={theme} />
      </div>

      {(limitLabel || limitValue) && (
        <div className="flex items-center justify-between text-xs">
          <span className={mutedColor}>{limitLabel}</span>
          {limitValue && (
            <span
              className={`border px-2 py-0.5 tabular-nums ${limitBadge}`}
            >
              {limitValue}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function ResourceCardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
