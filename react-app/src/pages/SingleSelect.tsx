import { useState } from "react";
import { AppSingleSelect } from "../components/app_single-select";

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "jinja", label: "Jinja" },
  { value: "alpine", label: "Alpine.js" },
  { value: "react-native", label: "React Native" },
  { value: "tailwind", label: "Tailwind" },
  { value: "echarts", label: "Apache ECharts" },
];

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
  { value: "guest", label: "Guest" },
];

export function SingleSelectPage() {
  const [framework, setFramework] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>("editor");
  const [invalidFramework, setInvalidFramework] = useState<string | null>(null);

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Single Select</h1>
        <p className="text-sm text-muted">
          Single select variations. Dropdown listbox with selection, clear action,
          and keyboard navigation.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Default
        </p>
        <AppSingleSelect
          className="w-[25vw]"
          label="Framework"
          options={frameworkOptions}
          selected={framework}
          onChange={setFramework}
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Small size
        </p>
        <AppSingleSelect
          className="w-[25vw]"
          label="Role"
          size="sm"
          options={roleOptions}
          selected={role}
          onChange={setRole}
          placeholder="Choose a role"
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Disabled
        </p>
        <AppSingleSelect
          className="w-[25vw]"
          label="Framework"
          options={frameworkOptions}
          selected="react"
          onChange={() => {}}
          disabled
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Invalid
        </p>
        <AppSingleSelect
          className="w-[25vw]"
          label="Framework"
          options={frameworkOptions}
          selected={invalidFramework}
          onChange={setInvalidFramework}
          invalid={invalidFramework === null}
          invalidText="Select a framework."
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Warning
        </p>
        <AppSingleSelect
          className="w-[25vw]"
          label="Framework"
          options={frameworkOptions}
          selected={framework}
          onChange={setFramework}
          warn
          warnText="This framework is deprecated."
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Read-only
        </p>
        <AppSingleSelect
          className="w-[25vw]"
          label="Framework"
          options={frameworkOptions}
          selected="react"
          onChange={() => {}}
          readOnly
        />
      </section>
    </main>
  );
}
