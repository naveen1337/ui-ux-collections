import type { MetricCardAccent } from "../../../components/metric-cards/react/metric-card";
import { AppMetricCard } from "../components/app_metric-card";

interface MetricData {
  title: string;
  value: string;
  unit?: string;
  change?: string;
  trend?: "up" | "down";
  caption?: string;
  alert?: boolean;
  menuItems?: string[];
  accent?: MetricCardAccent;
  theme?: "dark" | "light";
  onClick?: () => void;
}

const supplyMetrics: MetricData[] = [
  {
    title: "Supply below safety stock",
    value: "24",
    unit: "items",
    change: "22%",
    trend: "down",
    alert: true,
    menuItems: ["View details", "Edit threshold", "Dismiss"],
  },
  {
    title: "Overall supply inventory",
    value: "5,123",
    change: "7%",
    trend: "down",
    menuItems: ["View details", "Export data"],
  },
  {
    title: "Open supply order value",
    value: "318,923",
    caption: "CAD",
  },
  {
    title: "Average purchase order",
    value: "1,934",
    caption: "Per day",
  },
];

const trendMetrics: MetricData[] = [
  {
    title: "Revenue",
    value: "$84,210",
    change: "12.4%",
    trend: "up",
    menuItems: ["View report", "Export CSV"],
  },
  {
    title: "Active users",
    value: "26,510",
    change: "8.1%",
    trend: "up",
  },
  {
    title: "Error rate",
    value: "1.82%",
    change: "0.6%",
    trend: "down",
    alert: true,
  },
  {
    title: "Churn",
    value: "2.3%",
    change: "0.4%",
    trend: "down",
  },
];

const accentColors: MetricCardAccent[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
];

const accentMetrics: MetricData[] = accentColors.map((accent, i) => ({
  title: `${accent.charAt(0).toUpperCase() + accent.slice(1)} metric`,
  value: ["12,480", "98.2%", "142", "$9,300", "3.7s"][i],
  change: ["4.2%", "1.1%", "2.8%", "6.5%", "0.9%"][i],
  trend: (["up", "up", "down", "up", "down"] as const)[i],
  accent,
  menuItems: ["View details"],
}));

const lightMetrics: MetricData[] = [
  {
    title: "Orders shipped",
    value: "1,204",
    change: "5.6%",
    trend: "up",
    theme: "light",
  },
  {
    title: "Backorders",
    value: "38",
    change: "1.2%",
    trend: "down",
    alert: true,
    theme: "light",
  },
  {
    title: "Fulfillment rate",
    value: "96.4%",
    caption: "Rolling 30 days",
    theme: "light",
  },
  {
    title: "Suppliers active",
    value: "87",
    unit: "of 102",
    caption: "Updated hourly",
    theme: "light",
  },
];

function Section({ label, metrics }: { label: string; metrics: MetricData[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold tracking-widest text-muted uppercase">
        {label}
      </h2>
      <div className="flex flex-wrap gap-3">
        {metrics.map((m) => (
          <div key={m.title} className="w-[25vw]">
            <AppMetricCard
              title={m.title}
              value={m.value}
              unit={m.unit}
              change={m.change}
              trend={m.trend}
              caption={m.caption}
              alert={m.alert}
              menuItems={m.menuItems}
              accent={m.accent}
              theme={m.theme}
              onClick={m.onClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function Metrics() {
  return (
    <main className="flex flex-col gap-10 p-10">
      <header className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Metrics</h1>
        <p className="text-sm text-muted">
          All metric card variations, values passed as props.
        </p>
      </header>

      <Section label="Supply chain (alert, menu, unit, caption)" metrics={supplyMetrics} />
      <Section label="Trend indicators (up / down)" metrics={trendMetrics} />
      <Section label="Accent colors (semantic tokens)" metrics={accentMetrics} />
      <Section label="Light theme" metrics={lightMetrics} />
    </main>
  );
}
