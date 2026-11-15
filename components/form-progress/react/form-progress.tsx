export type FormProgressStep = {
  id: string;
  label: string;
  description?: string;
};

export interface FormProgressProps {
  steps: FormProgressStep[];
  current: number;
  onChange?: (index: number) => void;
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
  className,
}: FormProgressProps) {
  const interactive = typeof onChange === "function";

  return (
    <ol className={`flex w-full list-none ${className ?? ""}`}>
      {steps.map((step, index) => {
        const complete = index < current;
        const isCurrent = index === current;
        return (
          <li key={step.id} className="min-w-0 flex-1" aria-current={isCurrent ? "step" : undefined}>
            <span
              aria-hidden="true"
              className={`block h-0.5 w-full ${index <= current ? "bg-primary" : "bg-border"}`}
            />
            <button
              type="button"
              disabled={!interactive}
              onClick={() => onChange?.(index)}
              className={`flex items-start gap-2 pt-3 text-left ${interactive ? "cursor-pointer" : "cursor-default"}`}
            >
              {complete ? (
                <CompleteIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              ) : isCurrent ? (
                <CurrentIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              ) : (
                <UpcomingIcon className="mt-0.5 h-4 w-4 shrink-0 text-border" />
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
