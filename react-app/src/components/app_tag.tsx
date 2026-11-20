import type { ComponentProps } from "react";
import { Tag as CollectionTag } from "../../../components/tags/react/tag";

export type AppTagProps = ComponentProps<typeof CollectionTag>;

export function AppTag(props: AppTagProps) {
  return <CollectionTag {...props} />;
}
