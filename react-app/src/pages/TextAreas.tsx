import { AppTextArea } from "../components/app_text-area";

export function TextAreasPage() {
  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Text area</h1>
        <p className="text-sm text-muted">
          Carbon-style text areas across sizes with disabled, error and success
          states.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Sizes
        </p>
        <div className="flex flex-col gap-4">
          <AppTextArea className="w-[25vw]" label="Extra small" size="xs" placeholder="Input text" />
          <AppTextArea className="w-[25vw]" label="Small" size="sm" placeholder="Input text" />
          <AppTextArea className="w-[25vw]" label="Medium" size="md" placeholder="Input text" />
          <AppTextArea className="w-[25vw]" label="Large" size="lg" placeholder="Input text" />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          With helper text
        </p>
        <AppTextArea
          className="w-[25vw]"
          label="Description"
          placeholder="Describe your request"
          helperText="Optional helper text."
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Disabled
        </p>
        <AppTextArea
          className="w-[25vw]"
          label="Notes"
          value="Read-only content"
          disabled
          helperText="You don't have permission to edit this field."
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Error
        </p>
        <AppTextArea
          className="w-[25vw]"
          label="Comment"
          defaultValue="Too short"
          invalid
          invalidText="Enter at least 20 characters."
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Success
        </p>
        <AppTextArea
          className="w-[25vw]"
          label="Comment"
          defaultValue="This feedback is clear and actionable."
          success
          successText="Looks good."
        />
      </section>
    </main>
  );
}
