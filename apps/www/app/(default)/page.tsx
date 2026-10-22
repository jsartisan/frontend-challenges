import { Metadata } from "next";

import { absoluteUrl } from "~/shared/lib/seo";
import { HomePage } from "~/screens/home/index";

export const dynamic = "force-static";

// Title, description and Open Graph image are inherited from the root layout; only the canonical is page-specific.
export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default HomePage;
