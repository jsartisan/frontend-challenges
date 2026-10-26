"use client";

import { useEffect } from "react";

import { initAnalytics } from "~/shared/lib/analytics";

export function Mixpanel() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
