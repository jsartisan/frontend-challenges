import { ChallengeList } from "@/shared";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from "./ThemeProvider";
import { QueryProvider } from "./QueryProvider";
import { LayoutProvider } from "./LayoutProvider";
import { TooltipProvider } from "../components/ui";
import { ChallengesProvider } from "./ChallengesProvider";

type ProviderProps = {
  children: React.ReactNode;
  challenges: ChallengeList;
};

export function Provider(props: ProviderProps) {
  const { children, challenges } = props;

  return (
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
  );
}
