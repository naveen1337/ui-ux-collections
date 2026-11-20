export type FormProgressStep = {
  id: string;
  label: string;
  description?: string;
};

export interface FormProgressProps {
  steps: FormProgressStep[];
  current: number;
  onChange?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

function CompleteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <circle cx="8" cy="8" r="6.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.2 8.2 7.2 10.2 10.8 6.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CurrentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <circle cx="8" cy="8" r="8" fill="currentColor" />
    </svg>
  );
}

function UpcomingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <circle cx="8" cy="8" r="6.75" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function FormProgress({
  steps,
  current,
  onChange,
  orientation = "horizontal",
  className,
}: FormProgressProps) {
  const interactive = typeof onChange === "function";
  const isVertical = orientation === "vertical";

  return (
    <ol
      className={`flex w-full list-none ${isVertical ? "flex-col" : ""} ${className ?? ""}`}
    >
      {steps.map((step, index) => {
        const complete = index < current;
        const isCurrent = index === current;
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.id}
            className={isVertical ? "relative min-w-0 pb-6 last:pb-0" : "min-w-0 flex-1"}
            aria-current={isCurrent ? "step" : undefined}
          >
            {!isVertical && (
              <span
                aria-hidden="true"
                className={`block h-0.5 w-full ${index <= current ? "bg-primary" : "bg-border"}`}
              />
            )}
            {isVertical && !isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-[7px] top-5 bottom-0 w-0.5 ${index < current ? "bg-primary" : "bg-border"}`}
              />
            )}
            <button
              type="button"
              disabled={!interactive}
              onClick={() => onChange?.(index)}
              className={`flex items-start gap-2 text-left ${isVertical ? "" : "pt-3"} ${interactive ? "cursor-pointer" : "cursor-default"}`}
            >
              {complete ? (
                <CompleteIcon className={`${isVertical ? "" : "mt-0.5"} h-4 w-4 shrink-0 text-primary`} />
              ) : isCurrent ? (
                <CurrentIcon className={`${isVertical ? "" : "mt-0.5"} h-4 w-4 shrink-0 text-primary`} />
              ) : (
                <UpcomingIcon className={`${isVertical ? "" : "mt-0.5"} h-4 w-4 shrink-0 text-border`} />
              )}
              <span className="min-w-0">
                <span
                  className={`block text-sm ${complete ? "text-primary" : isCurrent ? "text-light" : "text-muted"}`}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="block text-xs text-muted">{step.description}</span>
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
