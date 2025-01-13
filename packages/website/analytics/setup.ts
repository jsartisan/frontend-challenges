import { Analytics } from "./analytics";
import { MixpanelProvider } from "./providers/mixpanel";

export const analytics = new Analytics([new MixpanelProvider(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_KEY!)]);
