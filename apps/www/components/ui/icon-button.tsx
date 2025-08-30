"use client";

import React, { ComponentRef, forwardRef } from "react";

import { cn } from "../../utils/helpers";
import { ButtonProps, Button } from "./button";

export const IconButton = forwardRef<ComponentRef<typeof Button>, ButtonProps>((props, ref) => {
  const { className, ...rest } = props;

  return <Button {...rest} ref={ref} className={cn("aspect-square p-0", className)}></Button>;
});

IconButton.displayName = "IconButton";
