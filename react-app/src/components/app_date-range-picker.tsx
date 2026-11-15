import type { ComponentProps } from "react";
import {
  DateRangePicker as CollectionDateRangePicker,
} from "../../../components/date-picker/react/date-range-picker";

export type AppDateRangePickerProps = ComponentProps<typeof CollectionDateRangePicker>;

export function AppDateRangePicker(props: AppDateRangePickerProps) {
  return <CollectionDateRangePicker {...props} />;
}
