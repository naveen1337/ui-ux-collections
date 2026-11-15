import type { ComponentProps } from "react";
import {
  NodeSidebar as CollectionNodeSidebar,
} from "../../../components/side-bars/react/node-sidebar";

export type AppNodeSidebarProps = ComponentProps<typeof CollectionNodeSidebar>;

export function AppNodeSidebar(props: AppNodeSidebarProps) {
  return <CollectionNodeSidebar {...props} />;
}
