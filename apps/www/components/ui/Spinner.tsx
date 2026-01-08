"use client";
import React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "~/utils/helpers";

import { Icon } from "./Icon";

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-5 w-5 animate-spin items-center justify-center", className)}>
      <Icon icon={Loader2} />
    </div>
  );
}
