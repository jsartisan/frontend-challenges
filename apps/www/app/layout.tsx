import "./globals.css";

import type { Metadata } from "next";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { cn } from "~/utils/helpers";
import { DOMAIN } from "~/shared/config/paths";
import { TooltipProvider } from "~/components/ui";
import { AuthProvider } from "~/shared/context/AuthProvider";
import { QueryProvider } from "~/shared/context/QueryProvider";
import { ThemeProvider } from "~/shared/context/ThemeProvider";
import { getChallenges } from "~/entities/challenge/api/getChallenges";
import { LayoutProvider } from "~/features/code-editor/context/LayoutProvider";
import { ChallengesProvider } from "~/entities/challenge/context/ChallengeProvider";

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
    <html suppressHydrationWarning className="overscroll-none">
      <link rel="icon" href="/favicon.ico" type="image/png" sizes="32x32" />
      <body className={cn("bg-secondary flex min-h-screen flex-col overflow-x-clip font-sans text-sm antialiased")}>
        <AuthProvider>
          <QueryProvider>
            <LayoutProvider>
              <ChallengesProvider challenges={challenges}>
                <TooltipProvider>
                  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <NuqsAdapter>{children}</NuqsAdapter>
                  </ThemeProvider>
                </TooltipProvider>
              </ChallengesProvider>
            </LayoutProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
