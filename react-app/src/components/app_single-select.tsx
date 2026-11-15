import type { ComponentProps } from "react";
import { SingleSelect as CollectionSingleSelect } from "../../../components/single-select/react/single-select";

export type AppSingleSelectProps = ComponentProps<typeof CollectionSingleSelect>;

export function AppSingleSelect(props: AppSingleSelectProps) {
  return <CollectionSingleSelect {...props} />;
}
