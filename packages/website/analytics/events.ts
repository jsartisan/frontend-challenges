export const ANALYTICS_EVENTS = {
  CHALLENGE_VIEWED: "Challenge Viewed",
  CHALLENGE_COMPLETED: "Challenge Completed",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

// Type-safe event properties
export interface EventProperties {
  [ANALYTICS_EVENTS.CHALLENGE_VIEWED]: {
    challenge: number;
    title?: string;
  };
}
