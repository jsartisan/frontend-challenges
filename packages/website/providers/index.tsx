import { Challenge } from "@/shared";

import { ThemeProvider } from "./ThemeProvider";
import { QueryProvider } from "./QueryProvider";
import { LayoutProvider } from "./LayoutProvider";
import { TooltipProvider } from "../components/ui";
import { ChallengesProvider } from "./ChallengesProvider";

type ProviderProps = {
  children: React.ReactNode;
  challenges: Challenge[];
};

export function Provider(props: ProviderProps) {
  const { children, challenges } = props;

  return (
    <QueryProvider>
      <LayoutProvider>
        <ChallengesProvider challenges={challenges}>
          <TooltipProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </TooltipProvider>
        </ChallengesProvider>
      </LayoutProvider>
    </QueryProvider>
  );
}
