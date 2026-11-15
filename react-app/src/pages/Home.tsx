import { Link } from "react-router-dom";

const components = [
  {
    name: "Metric Card",
    description: "Metric cards with trends, alerts, accents and themes.",
    href: "/metrics",
  },
  {
    name: "Navbar",
    description: "Top navigation bar with menu, search and actions.",
    href: "/navbar",
  },
  {
    name: "Multi Select",
    description: "Filterable multi select with search, clear and keyboard navigation.",
    href: "/multi-select",
  },
  {
    name: "Date Picker",
    description: "Date range picker with presets and calendar selection.",
    href: "/date-picker",
  },
  {
    name: "Button",
    description: "Carbon-style buttons: primary, secondary, tertiary, ghost, danger and icon-only.",
    href: "/buttons",
  },
  {
    name: "Form Progress",
    description: "Horizontal multi-step form progress with completed, current and upcoming states.",
    href: "/form-progress",
  },
  {
    name: "Input",
    description: "Carbon-style text inputs across sizes with icon, disabled, error and success states.",
    href: "/inputs",
  },
];

export function Home() {
  return (
    <main className="flex flex-col gap-10 p-10">
      <header className="flex flex-col gap-1">
        <p className="text-sm tracking-widest text-muted uppercase">
          UI/UX collections
        </p>
        <h1 className="text-4xl font-light tracking-tight">
          A reference library of components, ready to browse.
        </h1>
        <p className="max-w-xl text-sm text-muted">
          Explore the components rendered with the collection's design tokens.
        </p>
      </header>

      <div className="grid grid-cols-4 gap-4">
        {components.map((component) => (
          <div
            key={component.name}
            className="flex flex-col gap-2 border border-border bg-surface p-5"
          >
            <h2 className="text-lg font-semibold">{component.name}</h2>
            <p className="text-sm text-muted">{component.description}</p>
            <Link
              to={component.href}
              className="mt-auto inline-flex h-10 w-fit items-center justify-center bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-[#0353e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:bg-[#0143c4]"
            >
              Go
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
