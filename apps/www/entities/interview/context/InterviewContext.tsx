"use client";

import React, { createContext, useContext, useState } from "react";

type Round = 1 | 2 | 3 | 4 | 5;

type Answers = {
  round1?: Record<string, string>;
  round2?: string;
  round3?: string;
  round4?: string;
  round5?: Record<string, string>;
};

export type Framework = "react" | "javascript";
export type Level = "junior" | "mid-level" | "senior";

type InterviewState = {
  framework: Framework | null;
  setFramework: (framework: InterviewState["framework"]) => void;
  level: Level | null;
  currentRound: Round;
  answers: Answers;
  setLevel: (level: InterviewState["level"]) => void;
  nextRound: () => void;
  saveAnswers: (partial: Partial<Answers>) => void;
  reset: () => void;
};

const InterviewContext = createContext<InterviewState | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [framework, setFramework] = useState<InterviewState["framework"]>("javascript");
  const [level, setLevel] = useState<InterviewState["level"]>("junior");
  const [currentRound, setCurrentRound] = useState<Round>(1);
  const [answers, setAnswers] = useState<Answers>({});

  const nextRound = () => setCurrentRound((r) => (r < 5 ? ((r + 1) as Round) : r));
  const saveAnswers = (partial: Partial<Answers>) => setAnswers((prev) => ({ ...prev, ...partial }));
  const reset = () => {
    setFramework(null);
    setLevel(null);
    setCurrentRound(1);
    setAnswers({});
  };

  return (
    <InterviewContext.Provider
      value={{ framework, setFramework, level, currentRound, answers, setLevel, nextRound, saveAnswers, reset }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const ctx = useContext(InterviewContext);
  if (!ctx) throw new Error("useInterview must be used within InterviewProvider");
  return ctx;
};
