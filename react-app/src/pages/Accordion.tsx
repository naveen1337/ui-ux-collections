import type { ReactNode } from "react";
import { AppAccordion } from "../components/app_accordion";

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 1a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z" />
      <path d="M7.25 7h1.5v4h-1.5V7zm0-2.25h1.5v1.5h-1.5v-1.5z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M11 7V5a3 3 0 0 0-6 0v2H3.5v7.5h9V7H11zm-5 0V5a2 2 0 1 1 4 0v2H6zm5.5 6.5h-7V8h7v5.5z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M2 2.5h1v10h10.5v1H2V2.5zm3 6.5h1.5v2.5H5V9zm3-3h1.5v5.5H8V6zm3-2h1.5v7.5H11V4z" />
    </svg>
  );
}

const shortText = "The accordion component delivers large amounts of content in a small space through progressive disclosure.";

const longText = (
  <div className="flex flex-col gap-3">
    <p>
      Accordions help users see which sections are available and choose what to read. This makes
      them useful for dense content that would otherwise overwhelm the page.
    </p>
    <p>
      IBM Carbon-style accordions are stacked vertically and separated by rules. Each header can
      contain a label and an optional icon. Clicking the header toggles the associated panel.
    </p>
    <ul className="list-disc space-y-1 pl-5">
      <li>Use short, scannable titles so users can predict the content.</li>
      <li>Keep content focused; move unrelated information into another item.</li>
      <li>Support both brief summaries and longer, structured content in panels.</li>
    </ul>
  </div>
);

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-xs font-semibold tracking-widest text-muted uppercase">{title}</p>
      <div className="max-w-3xl border-x border-b border-border">{children}</div>
    </section>
  );
}

export function AccordionPage() {
  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Accordion</h1>
        <p className="max-w-2xl text-sm text-muted">
          IBM Carbon-style accordion for progressive disclosure. Includes normal and icon variants
          with short and large content.
        </p>
      </section>

      <Section title="Normal (short & large content)">
        <AppAccordion
          defaultOpenIds={["short"]}
          items={[
            { id: "short", title: "Short content", content: shortText },
            { id: "large", title: "Large content", content: longText },
            {
              id: "closed",
              title: "Additional details",
              content: "Panels can contain plain text, lists, or any custom React content.",
            },
          ]}
        />
      </Section>

      <Section title="With icons">
        <AppAccordion
          defaultOpenIds={["overview"]}
          items={[
            { id: "overview", title: "Overview", icon: <InfoIcon />, content: shortText },
            { id: "security", title: "Security", icon: <LockIcon />, content: longText },
            {
              id: "metrics",
              title: "Metrics",
              icon: <ChartIcon />,
              content: "Icon items keep labels aligned and readable even with longer content below.",
            },
          ]}
        />
      </Section>

      <Section title="Sizes">
        <div className="flex flex-col gap-6 p-4">
          <div className="border-x border-b border-border">
            <p className="px-4 pt-3 text-xs text-muted">Small</p>
            <AppAccordion
              size="sm"
              defaultOpenIds={["sm-1"]}
              items={[
                { id: "sm-1", title: "Small item", icon: <InfoIcon />, content: shortText },
                { id: "sm-2", title: "Another item", icon: <LockIcon />, content: "Compact row height." },
              ]}
            />
          </div>
          <div className="border-x border-b border-border">
            <p className="px-4 pt-3 text-xs text-muted">Medium</p>
            <AppAccordion
              size="md"
              defaultOpenIds={["md-1"]}
              items={[
                { id: "md-1", title: "Medium item", icon: <InfoIcon />, content: shortText },
                { id: "md-2", title: "Another item", icon: <LockIcon />, content: "Default row height." },
              ]}
            />
          </div>
          <div className="border-x border-b border-border">
            <p className="px-4 pt-3 text-xs text-muted">Large</p>
            <AppAccordion
              size="lg"
              defaultOpenIds={["lg-1"]}
              items={[
                { id: "lg-1", title: "Large item", icon: <InfoIcon />, content: shortText },
                { id: "lg-2", title: "Another item", icon: <LockIcon />, content: "Comfortable row height." },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section title="Chevron at end">
        <AppAccordion
          align="end"
          defaultOpenIds={["end-1"]}
          items={[
            { id: "end-1", title: "End-aligned chevron", icon: <InfoIcon />, content: shortText },
            { id: "end-2", title: "Large content", icon: <ChartIcon />, content: longText },
          ]}
        />
      </Section>
    </main>
  );
}
