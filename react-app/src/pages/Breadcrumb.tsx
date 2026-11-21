import { useState } from "react";
import { AppBreadcrumb } from "../components/app_breadcrumb";

export function BreadcrumbPage() {
  const [lastNavigated, setLastNavigated] = useState<string>("none");

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Breadcrumb</h1>
        <p className="text-sm text-muted">
          Carbon-style breadcrumb trails showing the path from a root page to the current page.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Links with href
        </p>
        <AppBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/cards" },
            { label: "Breadcrumb" },
          ]}
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Links with onSelect
        </p>
        <AppBreadcrumb
          items={[
            { label: "Projects", onSelect: () => setLastNavigated("Projects") },
            { label: "Design system", onSelect: () => setLastNavigated("Design system") },
            { label: "Tokens", onSelect: () => setLastNavigated("Tokens") },
            { label: "Colors" },
          ]}
          onNavigate={(item) => setLastNavigated(String(item.label))}
        />
        <p className="text-sm text-muted">Last navigated: {lastNavigated}</p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Deep path
        </p>
        <AppBreadcrumb
          items={[
            { label: "Workspace", href: "/" },
            { label: "Analytics", href: "/metrics" },
            { label: "Reports", href: "/metrics" },
            { label: "2026", href: "/metrics" },
            { label: "November", href: "/metrics" },
            { label: "Weekly summary" },
          ]}
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Single item
        </p>
        <AppBreadcrumb items={[{ label: "Dashboard" }]} />
      </section>
    </main>
  );
}
