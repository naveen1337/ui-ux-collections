import type { ComponentProps } from "react";
import { Navbar as CollectionNavbar } from "../../../components/nav-bars/react/navbar";

export type AppNavbarProps = ComponentProps<typeof CollectionNavbar>;

export function AppNavbar(props: AppNavbarProps) {
  return <CollectionNavbar {...props} />;
}
