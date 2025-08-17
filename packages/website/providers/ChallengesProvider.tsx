"use client";

import { createContext, useContext } from "react";

import { ChallengeList } from "@/shared";

export const ChallengesContext = createContext<{ challenges: ChallengeList }>({
  challenges: [],
});

type ChallengeProviderProps = {
  children: React.ReactNode;
  challenges: ChallengeList;
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
