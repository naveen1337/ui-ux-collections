import { AppButton } from "../components/app_button";
import { AddIcon } from "../../../components/icons/react/add-icon";

export function ButtonsPage() {
  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Button</h1>
        <p className="text-sm text-muted">
          Buttons per the IBM Carbon Design System: primary, secondary,
          tertiary, ghost, danger, and icon-only variations.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Kinds
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <AppButton kind="primary">Primary button</AppButton>
          <AppButton kind="secondary">Secondary button</AppButton>
          <AppButton kind="tertiary">Tertiary button</AppButton>
          <AppButton kind="ghost">Ghost button</AppButton>
          <AppButton kind="danger">Danger button</AppButton>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          With icon
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <AppButton kind="primary" icon={<AddIcon />}>
            Primary button
          </AppButton>
          <AppButton kind="tertiary" icon={<AddIcon />}>
            Tertiary button
          </AppButton>
          <AppButton kind="ghost" icon={<AddIcon />}>
            Ghost button
          </AppButton>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Icon only
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <AppButton iconOnly aria-label="Add" icon={<AddIcon />} />
          <AppButton iconOnly size="sm" aria-label="Add" icon={<AddIcon />} />
          <AppButton iconOnly size="lg" aria-label="Add" icon={<AddIcon />} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Sizes
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <AppButton size="sm">Small</AppButton>
          <AppButton size="md">Medium</AppButton>
          <AppButton size="lg">Large</AppButton>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Disabled
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <AppButton kind="primary" disabled>
            Primary button
          </AppButton>
          <AppButton kind="secondary" disabled>
            Secondary button
          </AppButton>
          <AppButton kind="tertiary" disabled>
            Tertiary button
          </AppButton>
          <AppButton kind="ghost" disabled>
            Ghost button
          </AppButton>
          <AppButton kind="danger" disabled>
            Danger button
          </AppButton>
        </div>
      </section>
    </main>
  );
}
