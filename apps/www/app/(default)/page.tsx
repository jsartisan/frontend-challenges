import { Metadata } from "next";

import { JsonLd } from "~/shared/ui/JsonLd";
import { HomePage } from "~/screens/home/index";
import { createPageMetadata } from "~/shared/lib/seo";
import { websiteJsonLd } from "~/shared/lib/structuredData";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Frontend Interview Questions & Coding Challenges | Frontend Challenges",
  description:
    "Practice frontend interview questions as coding challenges in JavaScript, React and CSS. Solve them in the browser with tests. Free and open source.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <HomePage />
    </>
  );
}
