"use client"

import React from "react"

import { cn } from "~/utils/helpers"
import { ButtonProps, Button } from "./button"

export function IconButton({ className, size = "icon", ...props }: ButtonProps) {
  return <Button {...props} size={size} className={cn("aspect-square p-0", className)} />
}
