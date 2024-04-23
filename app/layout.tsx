import "./globals.css";

import type { Metadata } from "next";
import { cn } from "@/utils/helpers";
import { Provider } from "@/providers";
import { getChallenges } from "@/db/challenge";
import { Header } from "@/components/layout/Header";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
      <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
      <body className={cn("bg-background-secondary font-sans text-sm antialiased", fontSans.variable)}>
        <Provider>
          <Header challenges={challenges.map((c) => ({ path: c.path, title: c.info.en?.title }))} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
