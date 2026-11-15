import type { ComponentProps } from "react";
import {
  MetricCard as CollectionMetricCard,
  MetricCardGrid as CollectionMetricCardGrid,
} from "../../../components/metric-cards/react/metric-card";

export type AppMetricCardProps = ComponentProps<typeof CollectionMetricCard>;

export function AppMetricCard(props: AppMetricCardProps) {
  return <CollectionMetricCard {...props} />;
}

export type AppMetricCardGridProps = ComponentProps<
  typeof CollectionMetricCardGrid
>;

export function AppMetricCardGrid(props: AppMetricCardGridProps) {
  return <CollectionMetricCardGrid {...props} />;
}
