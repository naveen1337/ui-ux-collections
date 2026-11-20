import type { ComponentProps } from "react";
import { Toggle as CollectionToggle } from "../../../components/toggle/react/toggle";

export type AppToggleProps = ComponentProps<typeof CollectionToggle>;

export function AppToggle(props: AppToggleProps) {
  return <CollectionToggle {...props} />;
}
