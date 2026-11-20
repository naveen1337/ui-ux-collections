import { useState } from "react";
import { AppTag } from "../components/app_tag";

export function TagPage() {
  const [filters, setFilters] = useState<string[]>(["React"]);
  const [selected, setSelected] = useState<string[]>(["Design"]);
  const [labels, setLabels] = useState<string[]>([
    "Urgent",
    "Customer feedback",
    "Q4 planning",
  ]);

  const toggleFilter = (value: string, on: boolean) =>
    setSelected((prev) => (on ? [...prev, value] : prev.filter((v) => v !== value)));

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Tag</h1>
        <p className="text-sm text-muted">
          Carbon-style tags to label, categorize, filter and manage content.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Read-only
        </p>
        <div className="flex flex-wrap gap-2">
          <AppTag kind="read-only" color="blue">Design</AppTag>
          <AppTag kind="read-only" color="purple">Research</AppTag>
          <AppTag kind="read-only" color="green">Approved</AppTag>
          <AppTag kind="read-only" color="yellow">In review</AppTag>
          <AppTag kind="read-only" color="red">Blocked</AppTag>
          <AppTag kind="read-only" color="cyan">Docs</AppTag>
          <AppTag kind="read-only">Default</AppTag>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Sizes
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <AppTag kind="read-only" size="sm" color="blue">Small</AppTag>
          <AppTag kind="read-only" size="md" color="blue">Medium</AppTag>
          <AppTag kind="read-only" size="lg" color="blue">Large</AppTag>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          With icon
        </p>
        <div className="flex flex-wrap gap-2">
          <AppTag
            kind="read-only"
            color="green"
            icon={<span aria-hidden="true">●</span>}
          >
            Online
          </AppTag>
          <AppTag
            kind="read-only"
            color="red"
            icon={<span aria-hidden="true">▲</span>}
          >
            Critical
          </AppTag>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Dismissible
        </p>
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <AppTag
              key={label}
              kind="dismissible"
              color="gray"
              dismissLabel={`Remove ${label}`}
              onDismiss={() => setLabels((prev) => prev.filter((l) => l !== label))}
            >
              {label}
            </AppTag>
          ))}
          {labels.length === 0 && (
            <p className="text-sm text-muted">All labels removed.</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <AppTag kind="dismissible" color="blue" disabled dismissLabel="Remove Locked">
            Locked
          </AppTag>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Selectable
        </p>
        <div className="flex flex-wrap gap-2">
          {["Design", "Engineering", "Marketing", "Research"].map((value) => (
            <AppTag
              key={value}
              kind="selectable"
              size="lg"
              selected={selected.includes(value)}
              onSelectedChange={(on) => toggleFilter(value, on)}
            >
              {value}
            </AppTag>
          ))}
          <AppTag kind="selectable" size="lg" disabled>
            Disabled
          </AppTag>
        </div>
        <p className="text-sm text-muted">
          Selected: {selected.length ? selected.join(", ") : "none"}
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Operational
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <AppTag kind="operational" onOperate={() => setFilters(["React", "Vue", "Svelte"])}>
            +3
          </AppTag>
          <AppTag kind="operational" disabled>
            +5
          </AppTag>
        </div>
        <p className="text-sm text-muted">Showing: {filters.join(", ")}</p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Disabled
        </p>
        <div className="flex flex-wrap gap-2">
          <AppTag kind="read-only" disabled>Disabled read-only</AppTag>
          <AppTag kind="read-only" color="blue" disabled>Disabled blue</AppTag>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Skeleton
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <AppTag skeleton size="sm" />
          <AppTag skeleton size="md" />
          <AppTag skeleton size="lg" />
        </div>
      </section>
    </main>
  );
}
