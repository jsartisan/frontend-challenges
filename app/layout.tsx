import "./globals.css";

import type { Metadata } from "next";
import { cn } from "@/utils/helpers";
import { Provider } from "@/providers";
import { getChallenges } from "@/db/challenge";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Frontend Challenges",
  description:
    "Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you prepare for frontend interviews. It's free and open source.",
};

export default async function RootLayout(params) {
  const { children }: { children: React.ReactNode } = params;
  const challenges = await getChallenges();

  return (
    <html suppressHydrationWarning>
      <link rel="icon" href="/images/favicon.ico" type="image/png" sizes="32x32" />
      <body className={cn("flex min-h-screen flex-col bg-background-secondary font-sans text-sm antialiased")}>
        <Provider>
          <Header challenges={challenges.map((c) => ({ path: c.path, title: c.info.en?.title }))} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
