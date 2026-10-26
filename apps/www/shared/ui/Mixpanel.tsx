"use client";

import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export function Mixpanel() {
  useEffect(() => {
    if (!MIXPANEL_TOKEN || process.env.NODE_ENV !== "production") return;

    mixpanel.init(MIXPANEL_TOKEN, {
      persistence: "localStorage",
      track_pageview: "url-with-path",
    });
  }, []);

  return null;
}
