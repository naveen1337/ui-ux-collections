import { useState } from "react";
import { AppNotification } from "../components/app_notification";
import { AppButton } from "../components/app_button";

export function NotificationPage() {
  const [inlineVisible, setInlineVisible] = useState(true);
  const [toastVisible, setToastVisible] = useState(true);
  const [toastCount, setToastCount] = useState(0);

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Notification</h1>
        <p className="text-sm text-muted">
          Carbon-style notifications: inline, toast, actionable and callout variants
          across informational, success, warning and error statuses.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Inline
        </p>
        <div className="flex max-w-2xl flex-col gap-4">
          {inlineVisible ? (
            <AppNotification
              variant="inline"
              status="error"
              title="Server instance unavailable"
              onDismiss={() => setInlineVisible(false)}
              dismissLabel="Dismiss server instance notification"
            >
              The instance could not be reached. Check the status page and try again.
            </AppNotification>
          ) : (
            <AppButton kind="secondary" size="sm" onClick={() => setInlineVisible(true)}>
              Restore notification
            </AppButton>
          )}
          <AppNotification variant="inline" status="success" title="Deployed">
            All 12 instances are running the latest build.
          </AppNotification>
          <AppNotification variant="inline" status="warning" title="Storage almost full">
            90% of the volume is in use. Free up space or expand the volume.
          </AppNotification>
          <AppNotification variant="inline" status="informational" title="Scheduled maintenance">
            The service will be unavailable on Sunday from 02:00 to 04:00 UTC.
          </AppNotification>
          <AppNotification variant="inline" status="success" title="Critical notification">
            This close button is omitted when the message must be read.
          </AppNotification>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Toast
        </p>
        <p className="text-sm text-muted">
          Fixed width, stacked 0.5rem apart. Toasts disappear on their own after
          about 5 seconds unless they carry an action.
        </p>
        <div className="flex flex-col gap-2">
          {toastVisible && (
            <AppNotification
              variant="toast"
              status="success"
              title="Event successfully created"
              caption="14:32"
              timeoutMs={5000}
              onDismiss={() => setToastVisible(false)}
            >
              The event is now visible to all attendees.
            </AppNotification>
          )}
          <AppNotification
            variant="toast"
            status="error"
            title="Connection lost"
          >
            We could not reach the service. Your work is saved locally.
          </AppNotification>
          <AppNotification
            variant="toast"
            status="informational"
            title="Invitation sent"
            caption="14:30"
          />
        </div>
        <div>
          <AppButton
            kind="secondary"
            size="sm"
            onClick={() => {
              setToastCount((n) => n + 1);
              setToastVisible(true);
            }}
          >
            Show auto-dismissing toast
          </AppButton>
          {toastCount > 0 && (
            <p className="mt-2 text-sm text-muted">
              Shown {toastCount} {toastCount === 1 ? "time" : "times"} — auto-dismisses
              after 5 seconds.
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Actionable
        </p>
        <p className="text-sm text-muted">
          One action per notification: a ghost button on inline, a tertiary button
          on toast. Actionable notifications persist until dismissed.
        </p>
        <div className="flex max-w-2xl flex-col gap-4">
          <AppNotification
            variant="inline"
            status="warning"
            title="Approval required"
            onDismiss={() => {}}
            action={{ label: "Review", onClick: () => {} }}
          >
            This deployment needs a second reviewer before it can ship.
          </AppNotification>
          <AppNotification
            variant="toast"
            status="informational"
            title="Recording available"
            action={{ label: "View", onClick: () => {} }}
          >
            The meeting recording finished processing.
          </AppNotification>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Callout
        </p>
        <p className="text-sm text-muted">
          Loads with the page, cannot be dismissed and supports only informational
          and warning statuses. Place it above the button or input it affects.
        </p>
        <div className="flex max-w-2xl flex-col gap-4">
          <AppNotification
            variant="callout"
            status="warning"
            title="Before you migrate"
            link={{ label: "Learn more about migration", href: "#migration" }}
          >
            Migrating a project is permanent. Export a backup copy first.
          </AppNotification>
          <AppNotification
            variant="callout"
            status="informational"
            link={{ label: "See supported regions", href: "#regions" }}
          >
            Resources in unsupported regions are billed at the standard rate.
          </AppNotification>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          High contrast
        </p>
        <p className="text-sm text-muted">
          Set <code>lowContrast</code> to false for critical messaging. Never mix
          styles within a variant.
        </p>
        <div className="flex max-w-2xl flex-col gap-4">
          <AppNotification
            variant="inline"
            status="error"
            lowContrast={false}
            title="Connection lost"
            onDismiss={() => {}}
          >
            We could not reach the service. Your work is saved locally.
          </AppNotification>
          <AppNotification
            variant="toast"
            status="success"
            lowContrast={false}
            title="Backup complete"
            caption="14:32"
          >
            128 objects uploaded to cold storage.
          </AppNotification>
          <AppNotification
            variant="callout"
            status="informational"
            lowContrast={false}
            title="New region available"
            link={{ label: "View pricing", href: "#pricing" }}
          >
            Workloads can now be deployed to São Paulo.
          </AppNotification>
        </div>
      </section>
    </main>
  );
}
