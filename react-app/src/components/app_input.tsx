import type { ComponentProps } from "react";
import { Input as CollectionInput } from "../../../components/inputs/react/input";

export type AppInputProps = ComponentProps<typeof CollectionInput>;

export function AppInput(props: AppInputProps) {
  return <CollectionInput {...props} />;
}
