import { useState } from "react";
import { AppMultiSelect } from "../components/app_multi-select";

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

export function MultiSelectPage() {
  const [frameworks, setFrameworks] = useState<string[]>(["react"]);
  const [roles, setRoles] = useState<string[]>([]);
  const [invalidFrameworks, setInvalidFrameworks] = useState<string[]>([]);

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Multi Select</h1>
        <p className="text-sm text-muted">
          Multi select variations. Filterable listbox with search, clear action,
          and keyboard navigation.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Default
        </p>
        <AppMultiSelect
          className="w-[25vw]"
          label="Frameworks"
          options={frameworkOptions}
          selected={frameworks}
          onChange={setFrameworks}
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Small size
        </p>
        <AppMultiSelect
          className="w-[25vw]"
          label="Roles"
          size="sm"
          options={roleOptions}
          selected={roles}
          onChange={setRoles}
          placeholder="Choose roles"
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Disabled
        </p>
        <AppMultiSelect
          className="w-[25vw]"
          label="Frameworks"
          options={frameworkOptions}
          selected={["react"]}
          onChange={() => {}}
          disabled
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Invalid
        </p>
        <AppMultiSelect
          className="w-[25vw]"
          label="Frameworks"
          options={frameworkOptions}
          selected={invalidFrameworks}
          onChange={setInvalidFrameworks}
          invalid={invalidFrameworks.length === 0}
          invalidText="Select at least one framework."
        />
      </section>
    </main>
  );
}
