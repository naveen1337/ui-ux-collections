import { useState } from "react";
import { AppCheckbox } from "../components/app_checkbox";

export function CheckboxPage() {
  const [checked, setChecked] = useState(true);

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Checkbox</h1>
        <p className="text-sm text-muted">
          Carbon-style checkboxes for single or multiple selections, with
          indeterminate, disabled, and invalid states.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Default
        </p>
        <div className="flex flex-col gap-3">
          <AppCheckbox label="Unchecked" />
          <AppCheckbox label="Checked" checked={checked} onChange={setChecked} />
          <AppCheckbox label="With helper text" helperText="Optional helper text." />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Indeterminate
        </p>
        <AppCheckbox label="Partially selected" indeterminate />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Disabled
        </p>
        <div className="flex flex-col gap-3">
          <AppCheckbox label="Disabled unchecked" disabled />
          <AppCheckbox label="Disabled checked" checked disabled />
          <AppCheckbox label="Disabled indeterminate" indeterminate disabled />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Invalid
        </p>
        <AppCheckbox
          label="Accept terms"
          invalid
          invalidText="You must accept the terms to continue."
        />
      </section>
    </main>
  );
}
