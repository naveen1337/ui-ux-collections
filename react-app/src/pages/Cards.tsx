import type { ReactNode } from "react";
import type { ResourceCardAccent } from "../../../components/cards/react/resource-card";
import {
  AppResourceCard,
  AppResourceCardGrid,
  AppResourceUsageBar,
} from "../components/app_resource-card";

interface ResourceData {
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
  theme?: "dark" | "light";
}

const resourceMetrics: ResourceData[] = [
  {
    name: "CPU",
    icon: <span className="inline-block h-3 w-3 bg-primary" />,
    allocated: "8 cores",
    used: "4.6 cores",
    utilization: "57%",
    usage: 57,
    limitLabel: "CPU limit",
    limitValue: "8 cores",
    accent: "warning",
  },
  {
    name: "GPU",
    icon: <span className="inline-block h-3 w-3 bg-success" />,
    allocated: "4× H100",
    used: "3.3 GPUs",
    utilization: "82%",
    usage: 82,
    limitLabel: "GPU limit",
    limitValue: "4 GPUs",
    accent: "success",
  },
  {
    name: "Memory",
    icon: <span className="inline-block h-3 w-3 bg-error" />,
    allocated: "64 GB",
    used: "12.8 GB",
    utilization: "20%",
    usage: 20,
    limitLabel: "Mem limit",
    limitValue: "65536 MB",
    accent: "error",
  },
];

const accentResources: ResourceData[] = (
  ["primary", "secondary", "success", "warning", "error", "info"] as const
).map((accent, i) => ({
  name: accent.charAt(0).toUpperCase() + accent.slice(1),
  allocated: ["16 cores", "2 nodes", "32 GB", "512 GB", "8 TB", "10 Gb/s"][i],
  used: ["9.2 cores", "1 node", "21.4 GB", "128 GB", "2.1 TB", "4.2 Gb/s"][i],
  utilization: ["57%", "50%", "66%", "25%", "26%", "42%"][i],
  usage: [57, 50, 66, 25, 26, 42][i],
  limitLabel: "Limit",
  limitValue: ["16", "2", "32 GB", "512 GB", "8 TB", "10 Gb/s"][i],
  accent,
}));

const lightResources: ResourceData[] = [
  {
    name: "CPU",
    allocated: "8 cores",
    used: "4.6 cores",
    utilization: "57%",
    usage: 57,
    limitLabel: "CPU limit",
    limitValue: "8 cores",
    accent: "warning",
    theme: "light",
  },
  {
    name: "Memory",
    allocated: "64 GB",
    used: "12.8 GB",
    utilization: "20%",
    usage: 20,
    limitLabel: "Mem limit",
    limitValue: "65536 MB",
    accent: "error",
    theme: "light",
  },
];

function Section({ label, resources }: { label: string; resources: ResourceData[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold tracking-widest text-muted uppercase">
        {label}
      </h2>
      <AppResourceCardGrid>
        {resources.map((r) => (
          <AppResourceCard
            key={r.name + (r.theme ?? "dark")}
            name={r.name}
            icon={r.icon}
            allocated={r.allocated}
            used={r.used}
            utilization={r.utilization}
            usage={r.usage}
            usageLabel={r.usageLabel}
            limitLabel={r.limitLabel}
            limitValue={r.limitValue}
            accent={r.accent}
            theme={r.theme}
          />
        ))}
      </AppResourceCardGrid>
    </section>
  );
}

export function Cards() {
  return (
    <main className="flex flex-col gap-10 p-10">
      <header className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Cards</h1>
        <p className="text-sm text-muted">
          Resource cards with striped usage progress bars, values passed as props.
        </p>
      </header>

      <Section label="Resource management" resources={resourceMetrics} />
      <Section label="Accent colors (semantic tokens)" resources={accentResources} />
      <Section label="Light theme" resources={lightResources} />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold tracking-widest text-muted uppercase">
          Standalone usage bar
        </h2>
        <div className="flex max-w-md flex-col gap-3">
          <AppResourceUsageBar usage={57} accent="warning" />
          <AppResourceUsageBar usage={82} accent="success" />
          <AppResourceUsageBar usage={20} accent="error" />
        </div>
      </section>
    </main>
  );
}
