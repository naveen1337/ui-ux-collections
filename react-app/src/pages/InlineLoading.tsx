import { AppInlineLoading } from "../components/app_inline-loading";

export function InlineLoadingPage() {
  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Inline Loading</h1>
        <p className="text-sm text-muted">
          Carbon-style inline loading indicators for in-context progress, success and error feedback.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Statuses
        </p>
        <div className="flex flex-col gap-4">
          <AppInlineLoading status="active" description="Saving changes..." />
          <AppInlineLoading
            status="finished"
            successDescription="Changes saved"
          />
          <AppInlineLoading
            status="error"
            errorDescription="Failed to save changes"
          />
          <AppInlineLoading status="inactive" description="Waiting for input" />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Default descriptions
        </p>
        <div className="flex flex-col gap-4">
          <AppInlineLoading />
          <AppInlineLoading status="finished" />
          <AppInlineLoading status="error" />
        </div>
      </section>
    </main>
  );
}
