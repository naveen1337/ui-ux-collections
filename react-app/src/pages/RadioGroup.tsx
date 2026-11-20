import { useState } from "react";
import { AppRadioGroup } from "../components/app_radio-group";

const planOptions = [
  { value: "free", label: "Free", helperText: "Up to 5 projects" },
  { value: "pro", label: "Pro", helperText: "Unlimited projects" },
  { value: "team", label: "Team", helperText: "Collaboration features" },
];

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
  { value: "guest", label: "Guest", disabled: true },
];

export function RadioGroupPage() {
  const [plan, setPlan] = useState<string | null>("pro");
  const [role, setRole] = useState<string | null>(null);

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Radio Group</h1>
        <p className="text-sm text-muted">
          Carbon-style radio groups for mutually exclusive selections, with
          vertical and horizontal layouts.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Vertical
        </p>
        <AppRadioGroup
          legend="Plan"
          options={planOptions}
          value={plan}
          onChange={setPlan}
          helperText="Choose the plan that fits your needs."
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Horizontal
        </p>
        <AppRadioGroup
          legend="Role"
          orientation="horizontal"
          options={roleOptions}
          value={role}
          onChange={setRole}
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Disabled
        </p>
        <AppRadioGroup
          legend="Plan"
          options={planOptions}
          value="free"
          disabled
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Invalid
        </p>
        <AppRadioGroup
          legend="Role"
          options={roleOptions}
          value={role}
          onChange={setRole}
          invalid={role === null}
          invalidText="Select a role."
        />
      </section>
    </main>
  );
}
