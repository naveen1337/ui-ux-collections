import type { ComponentProps } from "react";
import {
  SingleDatePicker as CollectionSingleDatePicker,
} from "../../../components/date-picker/react/single-date-picker";

export type AppSingleDatePickerProps = ComponentProps<typeof CollectionSingleDatePicker>;

export function AppSingleDatePicker(props: AppSingleDatePickerProps) {
  return <CollectionSingleDatePicker {...props} />;
}
