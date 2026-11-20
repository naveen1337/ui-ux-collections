import type { ComponentProps } from "react";
import { RadioGroup as CollectionRadioGroup } from "../../../components/radio-group/react/radio-group";

export type AppRadioGroupProps = ComponentProps<typeof CollectionRadioGroup>;

export function AppRadioGroup(props: AppRadioGroupProps) {
  return <CollectionRadioGroup {...props} />;
}
