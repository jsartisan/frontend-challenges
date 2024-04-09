import "./globals.css";

import type { Metadata } from "next";
import { cn } from "@/utils/helpers";
import { Inter as FontSans } from "next/font/google";

import { TooltipProvider } from "@/components/ui";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LayoutProvider } from "@/providers/LayoutProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Frontend Challenges",
  description:
    "Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you prepare for frontend interviews. It's free and open source.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
      <body className={cn("bg-[var(--color-bg-secondary)] font-sans text-sm antialiased", fontSans.variable)}>
        <LayoutProvider>
          <TooltipProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </TooltipProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
