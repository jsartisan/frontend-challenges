"use client";

import { createContext, useContext } from "react";

import { Challenge } from "@/shared";

export const ChallengesContext = createContext<{ challenges: Challenge[] }>({
  challenges: [],
});

type ChallengeProviderProps = {
  children: React.ReactNode;
  challenges: Challenge[];
};

export function ChallengesProvider(props: ChallengeProviderProps) {
  const { children, challenges } = props;

  return (
    <ChallengesContext.Provider
      value={{
        challenges,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}

export function useChallenges() {
  return useContext(ChallengesContext);
}
