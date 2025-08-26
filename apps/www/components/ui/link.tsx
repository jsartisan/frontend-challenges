"use client";

import * as React from "react";
import NextLink from "next/link";

const Link = React.forwardRef<React.ElementRef<typeof NextLink>, React.ComponentPropsWithoutRef<typeof NextLink>>(
  ({ prefetch, ...props }, ref) => <NextLink ref={ref} prefetch={prefetch ?? false} {...props}></NextLink>,
);

Link.displayName = "Link";

export { Link };
