// hooks/useAnalytics.ts
import { useEffect } from "react";
import { analytics } from "~/analytics";
import { AnalyticsEventName } from "../analytics/events";

export function useEventTracking(
  eventName: AnalyticsEventName,
  properties?: Record<string, any>,
  dependencies: any[] = [],
) {
  useEffect(() => {
    analytics.track(eventName, properties);
  }, dependencies);
}
