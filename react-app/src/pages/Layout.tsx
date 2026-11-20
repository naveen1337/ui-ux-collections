import { Outlet, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
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
import { PanelIcon } from "../../../components/icons/react/panel-icon";

const menus = [
    {
      label: "Components",
      items: [
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
  "single-select": "/single-select",
  "multi-select": "/multi-select",
  "date-range-picker": "/date-range-picker",
  "single-date-picker": "/single-date-picker",
  "form-progress": "/form-progress",
  "metric-card": "/metrics",
  "resource-card": "/cards",
};

function Content({ children }: { children: ReactNode }) {
  return <div className="min-w-0 flex-1">{children}</div>;
}

export function Layout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-light">
      <AppNavbar
        productName="UI/UX Collections"
        menus={menus}
        user="user@company.com"
        onProductNameClick={() => navigate("/")}
        onMenuItemSelect={(_menu, item) => {
          const route = menuRoutes[item];
          if (route) navigate(route);
        }}
      />
      <div className="hidden md:flex min-h-0 flex-1">
        <AppNodeSidebar
          categories={sidebarCategories}
          theme="gray-100"
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
