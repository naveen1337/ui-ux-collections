import { AppInput } from "../components/app_input";

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M15 14.5 10.4 10a5.5 5.5 0 1 0-.4.4L14.5 15zM6.5 11a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InputsPage() {
  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Input</h1>
        <p className="text-sm text-muted">
          Carbon-style text inputs across sizes, with icon, disabled, error and
          success states.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Sizes
        </p>
        <div className="flex flex-col gap-4">
          <AppInput className="w-[25vw]" label="Extra small" size="xs" placeholder="Input text" />
          <AppInput className="w-[25vw]" label="Small" size="sm" placeholder="Input text" />
          <AppInput className="w-[25vw]" label="Medium" size="md" placeholder="Input text" />
          <AppInput className="w-[25vw]" label="Large" size="lg" placeholder="Input text" />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          With icon (left)
        </p>
        <AppInput
          className="w-[25vw]"
          label="Search"
          size="md"
          placeholder="Search anything"
          helperText="Press enter to search."
          icon={<SearchIcon />}
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          With icon (right)
        </p>
        <AppInput
          className="w-[25vw]"
          label="Amount"
          size="md"
          placeholder="0.00"
          helperText="USD only."
          iconPosition="right"
          icon={<SearchIcon />}
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Disabled
        </p>
        <AppInput
          className="w-[25vw]"
          label="Workspace name"
          size="md"
          value="my-workspace"
          disabled
          helperText="You don't have permission to edit this field."
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Error
        </p>
        <AppInput
          className="w-[25vw]"
          label="Email"
          size="md"
          defaultValue="not-an-email"
          invalid
          invalidText="Enter a valid email address."
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Success
        </p>
        <AppInput
          className="w-[25vw]"
          label="Email"
          size="md"
          defaultValue="name@company.com"
          success
          successText="Email available."
        />
      </section>
    </main>
  );
}
