import "./globals.css";

import type { Metadata } from "next";
import { cn } from "@/utils/helpers";
import { Provider } from "@/providers";
import { getChallenges } from "@/db/challenge";
import { Header } from "@/components/layout/Header";
import { DOMAIN } from "@/constants";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: "Frontend Challenges",
  description:
    "Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you prepare for frontend interviews. It's free and open source.",
  openGraph: {
    url: DOMAIN,
    images: "/og.png",
  },
};

export default async function RootLayout(params) {
  const { children }: { children: React.ReactNode } = params;
  const challenges = await getChallenges();

  return (
    <html suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" type="image/png" sizes="32x32" />
      <body className={cn("flex min-h-screen flex-col bg-[var(--color-bg-secondary)] font-sans text-sm antialiased")}>
        <Provider>
          <Header
            challenges={challenges.map((c) => ({ path: c.path, title: c.info.en?.title, difficulty: c.difficulty }))}
          />
          {children}
        </Provider>
      </body>
    </html>
  );
}
