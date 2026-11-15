import { useState } from "react";
import { AppFormProgress } from "../components/app_form-progress";
import type { FormProgressStep } from "../../../components/form-progress/react/form-progress";
import { AppButton } from "../components/app_button";

const steps: FormProgressStep[] = [
  { id: "account", label: "Account & Address Info" ,description: "Lorem insum text, Lorem insum text Lorem insum text Lorem insum text"},
  { id: "profile", label: "KYC Verification" },
  { id: "preferences", label: "Preview details", description: "Optional" },
  { id: "review", label: "Terms of condtions" },
];

export function FormProgressPage() {
  const [current, setCurrent] = useState(1);

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Form Progress</h1>
        <p className="text-sm text-muted">
          Horizontal multi-step form progress indicator with completed, current
          and upcoming states.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Horizontal multi-step form
        </p>
        <div className="border w-6/12 border-border bg-surface p-6">
          <AppFormProgress steps={steps} current={current} onChange={setCurrent} />
        </div>
        <div className="flex gap-3">
          <AppButton
            kind="secondary"
            onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
            disabled={current === 0}
          >
            Back
          </AppButton>
          <AppButton
            onClick={() => setCurrent((c) => Math.min(c + 1, steps.length - 1))}
            disabled={current === steps.length - 1}
          >
            Next
          </AppButton>
        </div>
        <p className="text-sm text-muted">
          Step {current + 1} of {steps.length}: {steps[current].label}
          {steps[current].description ? ` (${steps[current].description})` : ""}.
        </p>
      </section>
    </main>
  );
}
