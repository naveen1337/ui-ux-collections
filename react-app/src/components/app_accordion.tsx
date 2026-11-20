import type { ComponentProps } from "react";
import { Accordion as CollectionAccordion } from "../../../components/accordions/react/accordion";

export type AppAccordionProps = ComponentProps<typeof CollectionAccordion>;

export function AppAccordion(props: AppAccordionProps) {
  return <CollectionAccordion {...props} />;
}
