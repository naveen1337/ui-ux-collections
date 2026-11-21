import type { ComponentProps } from "react";
import { InlineLoading as CollectionInlineLoading } from "../../../components/loaders/react/inline-loading";

export type AppInlineLoadingProps = ComponentProps<typeof CollectionInlineLoading>;

export function AppInlineLoading(props: AppInlineLoadingProps) {
  return <CollectionInlineLoading {...props} />;
}
