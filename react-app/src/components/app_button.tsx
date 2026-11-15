import type { ComponentProps } from "react";
import { Button as CollectionButton } from "../../../components/buttons/react/button";

export type AppButtonProps = ComponentProps<typeof CollectionButton>;

export function AppButton(props: AppButtonProps) {
  return <CollectionButton {...props} />;
}
