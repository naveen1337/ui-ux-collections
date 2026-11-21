import type { ComponentProps } from "react";
import { Notification as CollectionNotification } from "../../../components/notifications/react/notification";

export type AppNotificationProps = ComponentProps<typeof CollectionNotification>;

export function AppNotification(props: AppNotificationProps) {
  return <CollectionNotification {...props} />;
}
