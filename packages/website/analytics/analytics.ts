import { AnalyticsService } from "./types";

const isDevelopment = process.env.NODE_ENV === "development";

export class Analytics {
  private providers: AnalyticsService[] = [];

  constructor(providers: AnalyticsService[]) {
    this.providers = providers;
  }

  track(eventName: string, properties?: Record<string, any>) {
    if (isDevelopment) {
      console.log("@frontend-challenge/analytics", "track", eventName, properties);
      return;
    }

    this.providers.forEach((provider) => {
      try {
        provider.track({ name: eventName, properties });
      } catch (error) {
        console.error(`Analytics tracking failed:`, error);
      }
    });
  }

  identify(userId: string, traits?: Record<string, any>) {
    if (isDevelopment) {
      console.log("@frontend-challenge/analytics", "identify", userId, traits);
      return;
    }

    this.providers.forEach((provider) => {
      try {
        provider.identify(userId, traits);
      } catch (error) {
        console.error(`Analytics identification failed:`, error);
      }
    });
  }

  page(properties?: Record<string, any>) {
    if (isDevelopment) {
      console.log("@frontend-challenge/analytics", "page", properties);
      return;
    }

    this.providers.forEach((provider) => {
      try {
        provider.page(properties);
      } catch (error) {
        console.error(`Page tracking failed:`, error);
      }
    });
  }
}
