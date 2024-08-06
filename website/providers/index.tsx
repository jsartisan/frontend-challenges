import { TooltipProvider } from "@/website/components/ui";
import { ThemeProvider } from "@/website/providers/ThemeProvider";
import { QueryProvider } from "@/website/providers/QueryProvider";
import { LayoutProvider } from "@/website/providers/LayoutProvider";

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
