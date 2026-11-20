import type { ComponentProps } from "react";
import { TextArea as CollectionTextArea } from "../../../components/inputs/react/text-area";

export type AppTextAreaProps = ComponentProps<typeof CollectionTextArea>;

export function AppTextArea(props: AppTextAreaProps) {
  return <CollectionTextArea {...props} />;
}
