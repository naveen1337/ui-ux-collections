import type { ComponentProps } from "react";
import { MultiSelect as CollectionMultiSelect } from "../../../components/multi-select/react/multi-select";

export type AppMultiSelectProps = ComponentProps<typeof CollectionMultiSelect>;

export function AppMultiSelect(props: AppMultiSelectProps) {
  return <CollectionMultiSelect {...props} />;
}
