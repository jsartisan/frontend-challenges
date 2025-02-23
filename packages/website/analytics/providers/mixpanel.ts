import mixpanel from "mixpanel-browser";
import { AnalyticsEvent, AnalyticsService } from "../types";

export class MixpanelProvider implements AnalyticsService {
  constructor(token: string) {
    mixpanel.init(token);
  }

  track({ name, properties }: AnalyticsEvent) {
    mixpanel.track(name, properties);
  }

  identify(userId: string, traits?: Record<string, any>) {
    mixpanel.identify(userId);

    if (traits) {
      mixpanel.people.set(traits);
    }
  }

  page(properties?: Record<string, any>) {
    mixpanel.track("Page Viewed", properties);
  }
}
