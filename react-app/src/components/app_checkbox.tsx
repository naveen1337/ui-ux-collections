import type { ComponentProps } from "react";
import { Checkbox as CollectionCheckbox } from "../../../components/checkbox/react/checkbox";

export type AppCheckboxProps = ComponentProps<typeof CollectionCheckbox>;

export function AppCheckbox(props: AppCheckboxProps) {
  return <CollectionCheckbox {...props} />;
}
