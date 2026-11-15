import type { ReactNode } from "react";
import {
  TriggerIcon,
  FilePlusIcon,
  CalendarIcon,
  WebhookIcon,
  FileSearchIcon,
  FilterIcon,
  TargetIcon,
  KeyIcon,
  GlobeIcon,
  PenIcon,
  ChatIcon,
  MailIcon,
  LayoutIcon,
} from "../../../components/icons/react/node-icons";
import type {
  NodeCategory,
  NodeSidebarDensity,
  NodeSidebarTheme,
} from "../../../components/side-bars/react/node-sidebar";
import { AppNodeSidebar } from "../components/app_node-sidebar";

const categories: NodeCategory[] = [
  {
    id: "triggers",
    label: "Triggers",
    items: [
      { id: "manual-trigger", label: "Manual trigger", icon: <TriggerIcon className="h-4 w-4" />, tags: ["popular"], recent: true },
      { id: "content-created", label: "Content created", icon: <FilePlusIcon className="h-4 w-4" /> },
      { id: "schedule", label: "Schedule", icon: <CalendarIcon className="h-4 w-4" />, recent: true },
      { id: "webhook", label: "Webhook", icon: <WebhookIcon className="h-4 w-4" /> },
    ],
  },
  {
    id: "research",
    label: "Research",
    items: [
      { id: "research", label: "Research", icon: <FileSearchIcon className="h-4 w-4" />, recent: true },
      { id: "deep-research", label: "Deep research", icon: <FilterIcon className="h-4 w-4" />, tags: ["new"], favourite: true },
      { id: "competitor-analysis", label: "Competitor analysis", icon: <TargetIcon className="h-4 w-4" /> },
      { id: "keyword-analysis", label: "Keyword analysis", icon: <KeyIcon className="h-4 w-4" />, recent: true },
      { id: "website-crawl", label: "Website crawl", icon: <GlobeIcon className="h-4 w-4" />, tags: ["beta"] },
    ],
  },
  {
    id: "content",
    label: "Content",
    items: [
      { id: "blog-post", label: "Blog post", icon: <PenIcon className="h-4 w-4" />, recent: true },
      { id: "social-post", label: "Social post", icon: <ChatIcon className="h-4 w-4" /> },
      { id: "email-draft", label: "Email draft", icon: <MailIcon className="h-4 w-4" />, tags: ["outline"], favourite: true },
      { id: "landing-page", label: "Landing page", icon: <LayoutIcon className="h-4 w-4" /> },
    ],
  },
];

function Stage({ children, height = "h-[560px]" }: { children: ReactNode; height?: string }) {
  return (
    <div className={`relative flex overflow-hidden rounded-sm border border-gray-300 bg-gray-100 ${height}`}>
      {children}
    </div>
  );
}

export function NodeSidebarPage() {
  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Node Sidebar</h1>
        <p className="text-sm text-muted">
          Carbon-style node panel with search (⌘+F), tabbed filtering, collapsible categories and
          favourite actions.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Default (White · md · fixed · line tabs)
        </p>
        <Stage height="h-[860px]">
          <AppNodeSidebar categories={categories} footerLabel="IBM Carbon v11 · White" />
        </Stage>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Carbon theme variants
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {(
            [
              ["white", "White"],
              ["gray-10", "Gray 10"],
              ["gray-90", "Gray 90"],
              ["gray-100", "Gray 100"],
            ] as [NodeSidebarTheme, string][]
          ).map(([theme, label]) => (
            <Stage key={theme} height="h-[480px]">
              <AppNodeSidebar
                categories={categories}
                theme={theme}
                footerLabel={`IBM Carbon v11 · ${label}`}
              />
            </Stage>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Density / size
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {(
            [
              ["sm", "sm · 32px rows"],
              ["md", "md · 40px rows"],
              ["lg", "lg · 48px rows"],
            ] as [NodeSidebarDensity, string][]
          ).map(([density, label]) => (
            <Stage key={density} height="h-[420px]">
              <AppNodeSidebar categories={categories} density={density} theme="gray-10" footerLabel={label} />
            </Stage>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Panel behavior
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Stage>
            <p className="absolute right-3 top-3 z-0 text-xs text-muted">fixed / docked</p>
            <AppNodeSidebar categories={categories} behavior="fixed" theme="gray-10" />
          </Stage>
          <Stage>
            <p className="absolute right-3 top-3 z-0 text-xs text-muted">collapsible icon rail</p>
            <AppNodeSidebar categories={categories} behavior="rail" theme="gray-10" />
          </Stage>
          <Stage>
            <p className="absolute right-3 top-3 z-0 text-xs text-muted">overlay drawer</p>
            <AppNodeSidebar categories={categories} behavior="overlay" theme="gray-10" />
          </Stage>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Tab styles &amp; tag types
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Stage height="h-[420px]">
            <AppNodeSidebar categories={categories} tabStyle="line" footerLabel="Line tabs" />
          </Stage>
          <Stage height="h-[420px]">
            <AppNodeSidebar
              categories={categories}
              tabStyle="contained"
              footerLabel="Contained tabs"
            />
          </Stage>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Stage height="h-[420px]">
            <AppNodeSidebar categories={categories} theme="gray-90" footerLabel="Gray 90 · dark tags" />
          </Stage>
          <Stage height="h-[420px]">
            <AppNodeSidebar
              categories={categories}
              theme="gray-100"
              defaultTab="favourites"
              footerLabel="Gray 100 · Favourites tab"
            />
          </Stage>
        </div>
      </section>
    </main>
  );
}
