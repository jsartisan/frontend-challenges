import "./globals.css";

import type { Metadata } from "next";

import { cn } from "~/utils/helpers";
import { QueryProvider } from "~/shared/context/QueryProvider";
import { ThemeProvider } from "~/shared/context/ThemeProvider";

export const metadata: Metadata = {
  title: "Learn Frontend",
  description: "Learn HTML, CSS, and JavaScript with AI. Ask questions and get instant answers.",
};

export default function RootLayout(params: { children: React.ReactNode }) {
  const { children } = params;

  return (
    <html suppressHydrationWarning className="overscroll-none">
      <link rel="icon" href="/favicon.ico" type="image/png" sizes="32x32" />
      <body className={cn("bg-background flex min-h-screen flex-col overflow-x-clip font-sans text-sm antialiased")}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
