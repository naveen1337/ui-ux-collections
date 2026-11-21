import type { ComponentProps } from "react";
import { Pagination as CollectionPagination } from "../../../components/paginations/react/pagination";

export type AppPaginationProps = ComponentProps<typeof CollectionPagination>;

export function AppPagination(props: AppPaginationProps) {
  return <CollectionPagination {...props} />;
}
