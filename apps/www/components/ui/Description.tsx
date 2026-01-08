import { Text as RACText, TextProps } from "react-aria-components";

import { cn } from "~/utils/helpers";

export function Description(props: TextProps) {
  return <RACText {...props} slot="description" className={cn("text-sm text-gray-600", props.className)} />;
}
