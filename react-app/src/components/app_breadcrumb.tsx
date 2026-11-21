import type { ComponentProps } from "react";
import { Breadcrumb as CollectionBreadcrumb } from "../../../components/breadcrumbs/react/breadcrumb";

export type AppBreadcrumbProps = ComponentProps<typeof CollectionBreadcrumb>;

export function AppBreadcrumb(props: AppBreadcrumbProps) {
  return <CollectionBreadcrumb {...props} />;
}
