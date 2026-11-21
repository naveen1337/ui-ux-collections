import { useState } from "react";
import { AppPagination, type AppPaginationProps } from "../components/app_pagination";

type DemoPaginationProps = Omit<
  AppPaginationProps,
  "page" | "pageSize" | "onPageChange" | "onPageSizeChange"
> & {
  page?: number;
  pageSize?: number;
};

function DemoPagination({
  page: initialPage = 1,
  pageSize: initialPageSize = 10,
  ...rest
}: DemoPaginationProps) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  return (
    <AppPagination
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      {...rest}
    />
  );
}

export function PaginationPage() {
  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Pagination</h1>
        <p className="text-sm text-muted">
          Carbon-style pagination bar with items-per-page select, item range, page select and
          previous/next navigation.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Sizes
        </p>
        <div className="flex flex-col gap-4">
          <DemoPagination size="xs" totalItems={100} />
          <DemoPagination size="sm" totalItems={100} />
          <DemoPagination size="md" totalItems={100} />
          <DemoPagination size="lg" totalItems={100} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Boundary states
        </p>
        <div className="flex flex-col gap-4">
          <DemoPagination totalItems={100} page={1} pageSize={10} />
          <DemoPagination totalItems={100} page={10} pageSize={10} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Custom text
        </p>
        <div className="flex flex-col gap-4">
          <DemoPagination
            totalItems={100}
            page={2}
            pageSize={10}
            itemsPerPageText="Rows:"
            formatRangeText={(start, end, total) => `${start} - ${end} / ${total} rows`}
            formatPagesText={(pages) => `of ${pages} pages`}
          />
        </div>
      </section>
    </main>
  );
}
