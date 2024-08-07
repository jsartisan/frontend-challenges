import { ThemeProvider } from "./ThemeProvider";
import { QueryProvider } from "./QueryProvider";
import { LayoutProvider } from "./LayoutProvider";
import { TooltipProvider } from "../components/ui";

export function Provider(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <QueryProvider>
      <LayoutProvider>
        <TooltipProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </TooltipProvider>
      </LayoutProvider>
    </QueryProvider>
  );
}
