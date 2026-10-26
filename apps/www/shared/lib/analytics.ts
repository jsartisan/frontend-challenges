import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const IS_ENABLED = Boolean(MIXPANEL_TOKEN) && process.env.NODE_ENV === "production";

let isInitialized = false;

export type AnalyticsEvent =
  | "Challenge Viewed"
  | "Challenge Started"
  | "Challenge Completed"
  | "Challenge Uncompleted"
  | "Template Changed"
  | "Tests Run"
  | "Tests Passed"
  | "Quiz Answered"
  | "Solution Viewed"
  | "Solution Shared"
  | "Playground Shared"
  | "Challenge Submitted"
  | "Search Result Selected";

// Child effects run before the root layout's effect, so init lazily on first use.
function ensureInitialized() {
  if (!IS_ENABLED || typeof window === "undefined") return false;

  if (!isInitialized) {
    mixpanel.init(MIXPANEL_TOKEN as string, {
      persistence: "localStorage",
      track_pageview: "url-with-path",
    });
    isInitialized = true;
  }

  return true;
}

export function initAnalytics() {
  ensureInitialized();
}

export function track(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  if (!ensureInitialized()) return;

  mixpanel.track(event, properties);
}
