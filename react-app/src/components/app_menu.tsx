import type { ComponentProps } from "react";
import { Menu as CollectionMenu } from "../../../components/menus/react/menu";

export type AppMenuProps = ComponentProps<typeof CollectionMenu>;

export function AppMenu(props: AppMenuProps) {
  return <CollectionMenu {...props} />;
}
