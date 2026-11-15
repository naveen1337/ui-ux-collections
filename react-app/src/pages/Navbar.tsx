import { AppNavbar } from "../components/app_navbar";

export function NavbarPage() {
  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Navbar</h1>
        <p className="text-sm text-muted">
          Navbar variations. The default dark navbar is rendered by the layout.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Light theme
        </p>
        <AppNavbar
          productName="Product Name"
          links={[{ label: "Link", href: "#" }]}
          menus={[
            {
              label: "Menu",
              items: ["Sub-menu item", "Sub-menu item", "Sub-menu item"],
            },
          ]}
          user="user@company.com"
          theme="light"
          notificationCount={3}
        />
      </section>
    </main>
  );
}
