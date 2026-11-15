/**
 * Icons: Node glyphs
 * Design type: IBM Carbon UI style — stroke glyphs on the 32x32 grid
 * Usage: node-sidebar item icons
 * Props: className for sizing/color (color via Tailwind `text-*`)
 */
import type { ReactNode } from "react";

interface NodeIconProps {
  className?: string;
}

function Svg({ className = "h-4 w-4", children }: NodeIconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function TriggerIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <path d="M12 6l6 17 3-7 7-3z" />
    </Svg>
  );
}

export function FilePlusIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <path d="M18 3H7a1 1 0 0 0-1 1v24a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V11z" />
      <path d="M18 3v8h8" />
      <path d="M16 16v8M12 20h8" />
    </Svg>
  );
}

export function CalendarIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="7" width="24" height="21" rx="1" />
      <path d="M4 13h24M10 4v6M22 4v6" />
    </Svg>
  );
}

export function WebhookIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <circle cx="16" cy="8" r="4" />
      <path d="M16 12v14M8 20c0 4 4 6 8 6s8-2 8-6M6 20h4M22 20h4" />
    </Svg>
  );
}

export function FileSearchIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <path d="M18 3H7a1 1 0 0 0-1 1v24a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V11z" />
      <path d="M18 3v8h8" />
      <circle cx="15" cy="19" r="4" />
      <path d="M18 22l4 4" />
    </Svg>
  );
}

export function FilterIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <path d="M6 10h20M10 16h12M14 22h4" />
    </Svg>
  );
}

export function TargetIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <circle cx="16" cy="16" r="10" />
      <circle cx="16" cy="16" r="5" />
      <circle cx="16" cy="16" r="0.5" />
    </Svg>
  );
}

export function KeyIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <circle cx="10" cy="22" r="5" />
      <path d="M13.5 18.5L26 6M20 12l4 4M23 9l3 3" />
    </Svg>
  );
}

export function GlobeIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <circle cx="16" cy="16" r="11" />
      <path d="M5 16h22" />
      <ellipse cx="16" cy="16" rx="5" ry="11" />
    </Svg>
  );
}

export function PenIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <path d="M6 26l3-8L23 4l5 5-14 14z" />
      <path d="M20 7l5 5" />
    </Svg>
  );
}

export function ChatIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <path d="M28 22H12l-8 6V6h24z" />
    </Svg>
  );
}

export function MailIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="8" width="24" height="16" rx="1" />
      <path d="M4 9l12 9 12-9" />
    </Svg>
  );
}

export function LayoutIcon({ className }: NodeIconProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="5" width="24" height="22" rx="1" />
      <path d="M4 12h24M13 12v15" />
    </Svg>
  );
}
