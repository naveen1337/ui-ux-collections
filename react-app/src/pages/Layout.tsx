import { Outlet, useNavigate } from "react-router-dom";
import { AppNavbar } from "../components/app_navbar";

const menus = [
  {
    label: "Components",
    items: ["Metric Card", "Navbar", "Multi Select", "Date Picker", "Button"],
  },
];

const menuRoutes: Record<string, string> = {
  "Metric Card": "/metrics",
  Navbar: "/navbar",
  "Multi Select": "/multi-select",
  "Date Picker": "/date-picker",
  Button: "/buttons",
};

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
      <Outlet />
    </div>
  );
}
