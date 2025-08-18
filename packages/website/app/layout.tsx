import "./globals.css";

import type { Metadata } from "next";
import { DOMAIN } from "@/shared";
import { getChallenges } from "@/backend";

import { cn } from "../utils/helpers";
import { Provider } from "../providers";

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
      <body
        className={cn(
          "bg-(--color-bg-secondary) flex min-h-screen flex-col overflow-x-clip font-sans text-sm antialiased",
        )}
      >
        <Provider challenges={challenges}>{children}</Provider>
      </body>
    </html>
  );
}
