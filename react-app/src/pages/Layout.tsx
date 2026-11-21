import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import { AppNavbar } from "../components/app_navbar";
import { AppNodeSidebar } from "../components/app_node-sidebar";
import type { NodeCategory } from "../../../components/side-bars/react/node-sidebar";
import {
  TriggerIcon,
  CalendarIcon,
  FileSearchIcon,
  FilterIcon,
  TargetIcon,
  PenIcon,
  LayoutIcon,
  FilePlusIcon,
} from "../../../components/icons/react/node-icons";
import { ChevronDownIcon } from "../../../components/icons/react/chevron-down-icon";
import { PanelIcon } from "../../../components/icons/react/panel-icon";
import { KebabIcon } from "../../../components/icons/react/kebab-icon";
import { WarningIcon } from "../../../components/icons/react/warning-icon";

const menus = [
    {
      label: "Components",
      items: [
        "Accordion",
        "Menu",
        "Metric Card",
        "Navbar",
        "Multi Select",
        "Single Select",
        "Date Range Picker",
        "Single Date Picker",
        "Button",
        "Input",
        "Text Area",
        "Checkbox",
        "Radio Group",
        "Toggle",
        "Tag",
        "Tree View",
        "Breadcrumb",
        "Inline Loading",
        "Notification",
        "Node Sidebar",
        "Resource Card",
      ],
    },
];

const sidebarCategories: NodeCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
      { id: "navbar", label: "Navbar", icon: <LayoutIcon className="h-4 w-4" />, recent: true },
      { id: "button", label: "Button", icon: <TriggerIcon className="h-4 w-4" />, tags: ["popular"] },
      {
        id: "node-sidebar",
        label: "Node Sidebar",
        icon: <PanelIcon className="h-4 w-4" />,
        tags: ["new"],
        recent: true,
      },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    items: [
      { id: "input", label: "Input", icon: <PenIcon className="h-4 w-4" /> },
      { id: "text-area", label: "Text Area", icon: <PenIcon className="h-4 w-4" /> },
      { id: "checkbox", label: "Checkbox", icon: <TargetIcon className="h-4 w-4" /> },
      { id: "radio-group", label: "Radio Group", icon: <TargetIcon className="h-4 w-4" /> },
      { id: "toggle", label: "Toggle", icon: <TriggerIcon className="h-4 w-4" /> },
      { id: "tag", label: "Tag", icon: <FilterIcon className="h-4 w-4" />, tags: ["new"], recent: true },
      { id: "single-select", label: "Single Select", icon: <TargetIcon className="h-4 w-4" /> },
      { id: "multi-select", label: "Multi Select", icon: <FilterIcon className="h-4 w-4" /> },
      {
        id: "date-range-picker",
        label: "Date Range Picker",
        icon: <CalendarIcon className="h-4 w-4" />,
      },
      {
        id: "single-date-picker",
        label: "Single Date Picker",
        icon: <CalendarIcon className="h-4 w-4" />,
      },
      { id: "accordion", label: "Accordion", icon: <ChevronDownIcon className="h-4 w-4" />, recent: true },
      { id: "menu", label: "Menu", icon: <KebabIcon className="h-4 w-4" />, tags: ["new"], recent: true },
      { id: "tree-view", label: "Tree View", icon: <FileSearchIcon className="h-4 w-4" />, tags: ["new"], recent: true },
      { id: "breadcrumb", label: "Breadcrumb", icon: <ChevronDownIcon className="h-4 w-4" />, tags: ["new"], recent: true },
      { id: "inline-loading", label: "Inline Loading", icon: <FilePlusIcon className="h-4 w-4" />, tags: ["new"], recent: true },
      { id: "notification", label: "Notification", icon: <WarningIcon className="h-4 w-4" />, tags: ["new"], recent: true },
      { id: "form-progress", label: "Form Progress", icon: <FilePlusIcon className="h-4 w-4" /> },
    ],
  },
  {
    id: "cards",
    label: "Cards",
    items: [
      {
        id: "metric-card",
        label: "Metric Card",
        icon: <FileSearchIcon className="h-4 w-4" />,
        tags: ["popular"],
        favourite: true,
        recent: true,
      },
      {
        id: "resource-card",
        label: "Resource Card",
        icon: <FileSearchIcon className="h-4 w-4" />,
        tags: ["new"],
        recent: true,
      },
    ],
  },
];

const menuRoutes: Record<string, string> = {
  Accordion: "/accordion",
  Menu: "/menu",
  "Metric Card": "/metrics",
  Navbar: "/navbar",
  "Multi Select": "/multi-select",
  "Single Select": "/single-select",
  "Date Range Picker": "/date-range-picker",
  "Single Date Picker": "/single-date-picker",
  Button: "/buttons",
  Input: "/inputs",
  "Text Area": "/text-areas",
  "Checkbox": "/checkbox",
  "Radio Group": "/radio-group",
  "Toggle": "/toggle",
  "Tag": "/tag",
  "Tree View": "/tree-view",
  "Breadcrumb": "/breadcrumb",
  "Inline Loading": "/inline-loading",
  Notification: "/notification",
  "Node Sidebar": "/node-sidebar",
  "Resource Card": "/cards",
};

const nodeRoutes: Record<string, string> = {
  navbar: "/navbar",
  button: "/buttons",
  "node-sidebar": "/node-sidebar",
  input: "/inputs",
  "text-area": "/text-areas",
  checkbox: "/checkbox",
  "radio-group": "/radio-group",
  toggle: "/toggle",
  tag: "/tag",
  "single-select": "/single-select",
  "multi-select": "/multi-select",
  "date-range-picker": "/date-range-picker",
  "single-date-picker": "/single-date-picker",
  accordion: "/accordion",
  menu: "/menu",
  "form-progress": "/form-progress",
  "tree-view": "/tree-view",
  breadcrumb: "/breadcrumb",
  "inline-loading": "/inline-loading",
  notification: "/notification",
  "metric-card": "/metrics",
  "resource-card": "/cards",
};

function Content({ children }: { children: ReactNode }) {
  return <div className="min-w-0 flex-1">{children}</div>;
}

type ThemeMode = "dark" | "light";
const THEME_STORAGE_KEY = "ui-ux-theme";

export function Layout() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<ThemeMode>(() =>
    localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  const toggleTheme = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  return (
    <div className="flex min-h-screen flex-col bg-bg text-light">
      <AppNavbar
        productName="UI/UX Collections"
        menus={menus}
        user="user@company.com"
        theme={mode === "dark" ? "dark" : "light"}
        onThemeToggle={toggleTheme}
        onProductNameClick={() => navigate("/")}
        onMenuItemSelect={(_menu, item) => {
          const route = menuRoutes[item];
          if (route) navigate(route);
        }}
      />
      <div className="hidden md:flex min-h-0 flex-1">
        <AppNodeSidebar
          categories={sidebarCategories}
          theme={mode === "dark" ? "gray-100" : "white"}
          footerLabel="UI/UX Collections"
          onNodeSelect={(node) => {
            const route = nodeRoutes[node.id];
            if (route) navigate(route);
          }}
          className="sticky border-r border-[#8d8d8d] top-12 h-[calc(100vh-3rem)] shrink-0"
        />
        <Content>
          <Outlet />
        </Content>
      </div>
    </div>
  );
}
