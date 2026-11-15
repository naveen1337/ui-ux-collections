import type { ComponentProps } from "react";
import {
  ResourceCard as CollectionResourceCard,
  ResourceCardGrid as CollectionResourceCardGrid,
  ResourceUsageBar as CollectionResourceUsageBar,
} from "../../../components/cards/react/resource-card";

export type AppResourceCardProps = ComponentProps<typeof CollectionResourceCard>;

export function AppResourceCard(props: AppResourceCardProps) {
  return <CollectionResourceCard {...props} />;
}

export type AppResourceCardGridProps = ComponentProps<
  typeof CollectionResourceCardGrid
>;

export function AppResourceCardGrid(props: AppResourceCardGridProps) {
  return <CollectionResourceCardGrid {...props} />;
}

export type AppResourceUsageBarProps = ComponentProps<
  typeof CollectionResourceUsageBar
>;

export function AppResourceUsageBar(props: AppResourceUsageBarProps) {
  return <CollectionResourceUsageBar {...props} />;
}
