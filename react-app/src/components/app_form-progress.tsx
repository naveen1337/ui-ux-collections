import type { ComponentProps } from "react";
import {
  FormProgress as CollectionFormProgress,
} from "../../../components/form-progress/react/form-progress";

export type AppFormProgressProps = ComponentProps<typeof CollectionFormProgress>;

export function AppFormProgress(props: AppFormProgressProps) {
  return <CollectionFormProgress {...props} />;
}
