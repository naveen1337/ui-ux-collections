import { useEffect, useRef, useState } from "react";
import { MenuIcon } from "../../icons/react/menu-icon";
import { ChevronDownIcon } from "../../icons/react/chevron-down-icon";
import { BellIcon } from "../../icons/react/bell-icon";
import { BrightenIcon } from "../../icons/react/brighten-icon";
import { HelpIcon } from "../../icons/react/help-icon";

export type NavbarTheme = "dark" | "light";

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarMenu {
  label: string;
  items: string[];
}

export interface NavbarProps {
  productName: string;
  links?: NavbarLink[];
  menus?: NavbarMenu[];
  user?: string;
  notificationCount?: number;
  theme?: NavbarTheme;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  onThemeToggle?: () => void;
  onHelpClick?: () => void;
  onUserMenuSelect?: (item: string) => void;
  onProductNameClick?: () => void;
  onMenuItemSelect?: (menu: string, item: string) => void;
}

const userMenuItems = ["Log out", "My profile", "Settings"];

export function Navbar({
  productName,
  links,
  menus,
  user,
  notificationCount,
  theme = "dark",
  onMenuClick,
  onNotificationClick,
  onThemeToggle,
  onHelpClick,
  onUserMenuSelect,
  onProductNameClick,
  onMenuItemSelect,
}: NavbarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  const bar = theme === "dark" ? "bg-surface text-subtle" : "bg-white text-gray-700 shadow-sm";
  const brandColor = theme === "dark" ? "text-light" : "text-gray-900";
  const hover = theme === "dark" ? "hover:bg-surface-hover" : "hover:bg-gray-100";
  const panel = theme === "dark" ? "bg-surface border-border" : "bg-white border-gray-200";
  const itemHover = theme === "dark" ? "text-subtle hover:bg-surface-hover" : "text-gray-700 hover:bg-gray-100";
  const iconButton = `inline-flex h-full items-center justify-center px-3 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${hover}`;

  const toggle = (key: string) => setOpenMenu((current) => (current === key ? null : key));

  const dropdown = (key: string) =>
    `absolute top-full left-0 z-20 min-w-48 border-y ${panel} ${
      openMenu === key ? "block" : "hidden"
    }`;

  return (
    <nav
      ref={rootRef}
      aria-label="Main navigation"
      className={`relative z-30 flex h-12 items-stretch justify-between ${bar}`}
    >
      <div className="flex items-stretch">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className={iconButton}
        >
          <MenuIcon />
        </button>
        {onProductNameClick ? (
          <button
            type="button"
            onClick={onProductNameClick}
            className={`flex items-center px-4 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${brandColor} ${hover}`}
          >
            {productName}
          </button>
        ) : (
          <span className={`flex items-center px-4 text-sm font-semibold ${brandColor}`}>
            {productName}
          </span>
        )}
        {links?.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`flex items-center px-4 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${hover} ${
              theme === "dark" ? "text-subtle" : "text-gray-700"
            }`}
          >
            {link.label}
          </a>
        ))}
        {menus?.map((menu, i) => (
          <div key={menu.label} className="relative flex items-stretch">
            <button
              type="button"
              aria-expanded={openMenu === `menu-${i}`}
              aria-haspopup="true"
              onClick={() => toggle(`menu-${i}`)}
              className={`flex items-center gap-2 px-4 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${hover} ${
                openMenu === `menu-${i}`
                  ? theme === "dark"
                    ? "bg-surface-hover text-light"
                    : "bg-gray-100 text-gray-900"
                  : theme === "dark"
                    ? "text-subtle"
                    : "text-gray-700"
              }`}
            >
              {menu.label}
              <ChevronDownIcon className="h-3.5 w-3.5" />
            </button>
            <ul className={dropdown(`menu-${i}`)}>
              {menu.items.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenu(null);
                      onMenuItemSelect?.(menu.label, item);
                    }}
                    className={`block w-full border-b px-4 py-3 text-left text-sm transition-colors last:border-b-0 ${itemHover}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-stretch">
        <button
          type="button"
          aria-label="Notifications"
          onClick={onNotificationClick}
          className={`relative ${iconButton}`}
        >
          <BellIcon />
          {typeof notificationCount === "number" && notificationCount > 0 && (
            <span className="absolute top-1.5 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-semibold text-white">
              {notificationCount}
            </span>
          )}
        </button>
        {user && (
          <div className="relative flex items-stretch">
            <button
              type="button"
              aria-expanded={openMenu === "user"}
              aria-haspopup="true"
              onClick={() => toggle("user")}
              className={`flex items-center gap-2 px-4 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${hover} ${
                theme === "dark" ? "text-subtle" : "text-gray-700"
              }`}
            >
              {user}
              <ChevronDownIcon className="h-3.5 w-3.5" />
            </button>
            <ul className={`${dropdown("user")} right-0 left-auto`}>
              {userMenuItems.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenu(null);
                      onUserMenuSelect?.(item);
                    }}
                    className={`block w-full border-b px-4 py-3 text-left text-sm transition-colors last:border-b-0 ${itemHover}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={onThemeToggle}
          className={iconButton}
        >
          <BrightenIcon />
        </button>
        <button
          type="button"
          aria-label="Help"
          onClick={onHelpClick}
          className={iconButton}
        >
          <HelpIcon />
        </button>
      </div>
    </nav>
  );
}
