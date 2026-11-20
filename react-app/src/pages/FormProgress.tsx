import { useState } from "react";
import { AppFormProgress } from "../components/app_form-progress";
import type { FormProgressStep } from "../../../components/form-progress/react/form-progress";
import { AppButton } from "../components/app_button";
import { AppInput } from "../components/app_input";
import { AppSingleSelect } from "../components/app_single-select";
import { AppMultiSelect } from "../components/app_multi-select";
import { AppSingleDatePicker } from "../components/app_single-date-picker";

const steps: FormProgressStep[] = [
  {
    id: "account",
    label: "Account & Address Info",
    description: "Basic details",
  },
  { id: "profile", label: "KYC Verification", description: "Identity check" },
  { id: "preferences", label: "Preferences", description: "Optional" },
  { id: "review", label: "Review", description: "Confirm" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
];

const interestOptions = [
  { value: "news", label: "Product updates" },
  { value: "offers", label: "Offers" },
  { value: "events", label: "Events" },
  { value: "research", label: "Research" },
];

function StepFields({ stepId }: { stepId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  const [docId, setDocId] = useState("");
  const [dob, setDob] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [reviewDate, setReviewDate] = useState("");

  if (stepId === "account") {
    return (
      <div className="flex flex-col gap-4">
        <AppInput
          id={`account-name-${stepId}`}
          label="Full name"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AppInput
          id={`account-email-${stepId}`}
          label="Email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AppSingleSelect
          label="Country"
          options={countryOptions}
          selected={country}
          onChange={setCountry}
          placeholder="Choose a country"
        />
      </div>
    );
  }

  if (stepId === "profile") {
    return (
      <div className="flex flex-col gap-4">
        <AppInput
          id={`profile-doc-${stepId}`}
          label="Document ID"
          placeholder="Enter document number"
          value={docId}
          onChange={(e) => setDocId(e.target.value)}
        />
        <AppSingleDatePicker
          label="Date of birth"
          value={dob}
          onChange={setDob}
          placeholder="mm/dd/yyyy"
        />
        <AppSingleSelect
          label="Country of issue"
          options={countryOptions}
          selected={country}
          onChange={setCountry}
          placeholder="Choose a country"
        />
      </div>
    );
  }

  if (stepId === "preferences") {
    return (
      <div className="flex flex-col gap-4">
        <AppMultiSelect
          label="Interests"
          options={interestOptions}
          selected={interests}
          onChange={setInterests}
          placeholder="Choose interests"
        />
        <AppInput
          id={`pref-notes-${stepId}`}
          label="Notes"
          placeholder="Anything we should know?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <AppSingleDatePicker
        label="Preferred start date"
        value={reviewDate}
        onChange={setReviewDate}
        placeholder="mm/dd/yyyy"
      />
      <AppInput
        id={`review-notes-${stepId}`}
        label="Review comments"
        placeholder="Optional comments"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <p className="text-sm text-muted">
        Review your details and continue to submit.
      </p>
    </div>
  );
}

export function FormProgressPage() {
  const [current, setCurrent] = useState(0);
  const [verticalCurrent, setVerticalCurrent] = useState(0);

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Form Progress</h1>
        <p className="text-sm text-muted">
          Horizontal and vertical form progress with step content using
          existing input, single select, multi select, and date picker
          components.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Horizontal multi-step form
        </p>
        <div className="border w-8/12 border-border bg-surface p-6">
          <AppFormProgress steps={steps} current={current} onChange={setCurrent} />
          <div className="mt-6 border-t border-border pt-6">
            <StepFields stepId={steps[current].id} />
          </div>
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
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Vertical multi-step form
        </p>
        <div className="border w-8/12 border-border bg-surface p-6">
          <div className="flex gap-8">
            <div className="w-72 shrink-0">
              <AppFormProgress
                steps={steps}
                current={verticalCurrent}
                onChange={setVerticalCurrent}
                orientation="vertical"
              />
            </div>
            <div className="min-w-0 flex-1 border-l border-border pl-8">
              <h2 className="mb-4 text-lg font-light text-light">
                {steps[verticalCurrent].label}
              </h2>
              <StepFields stepId={steps[verticalCurrent].id} />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <AppButton
            kind="secondary"
            onClick={() => setVerticalCurrent((c) => Math.max(c - 1, 0))}
            disabled={verticalCurrent === 0}
          >
            Back
          </AppButton>
          <AppButton
            onClick={() =>
              setVerticalCurrent((c) => Math.min(c + 1, steps.length - 1))
            }
            disabled={verticalCurrent === steps.length - 1}
          >
            Next
          </AppButton>
        </div>
      </section>
    </main>
  );
}
