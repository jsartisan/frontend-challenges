import { TooltipProvider } from "@/components/ui";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { LayoutProvider } from "@/providers/LayoutProvider";

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
