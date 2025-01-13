export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

export interface AnalyticsService {
  track(event: AnalyticsEvent): void;
  identify(userId: string, traits?: Record<string, any>): void;
  page(properties?: Record<string, any>): void;
}
