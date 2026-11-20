import { useState } from "react";
import { AppToggle } from "../components/app_toggle";

export function TogglePage() {
  const [enabled, setEnabled] = useState(true);

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Toggle</h1>
        <p className="text-sm text-muted">
          Carbon-style toggles for binary on/off settings with immediate effect.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Default
        </p>
        <div className="flex flex-col gap-4">
          <AppToggle label="Notifications" toggled={enabled} onToggle={setEnabled} />
          <AppToggle label="Dark mode" defaultToggled />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Sizes
        </p>
        <div className="flex flex-col gap-4">
          <AppToggle label="Small toggle" size="sm" defaultToggled />
          <AppToggle label="Medium toggle" size="md" defaultToggled />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          With state labels
        </p>
        <AppToggle label="Airplane mode" labelA="Off" labelB="On" />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Label hidden
        </p>
        <AppToggle label="Enable feature" hideLabel defaultToggled />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Disabled
        </p>
        <div className="flex flex-col gap-4">
          <AppToggle label="Disabled off" disabled />
          <AppToggle label="Disabled on" disabled defaultToggled />
        </div>
      </section>
    </main>
  );
}
