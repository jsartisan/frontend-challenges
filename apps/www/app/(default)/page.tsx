import { Metadata } from "next";

import { JsonLd } from "~/shared/ui/JsonLd";
import { absoluteUrl } from "~/shared/lib/seo";
import { websiteJsonLd } from "~/shared/lib/structuredData";
import { HomePage } from "~/screens/home/index";

export const dynamic = "force-static";

// Title, description and Open Graph image are inherited from the root layout; only the canonical is page-specific.
export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function Page() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <HomePage />
    </>
  );
}
