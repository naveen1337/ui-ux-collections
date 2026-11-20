import type { ComponentProps } from "react";
import { TreeView as CollectionTreeView } from "../../../components/tree-view/react/tree-view";

export type AppTreeViewProps = ComponentProps<typeof CollectionTreeView>;

export function AppTreeView(props: AppTreeViewProps) {
  return <CollectionTreeView {...props} />;
}
