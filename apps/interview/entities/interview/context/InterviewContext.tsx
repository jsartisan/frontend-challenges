"use client";

import React, { createContext, useContext, useState } from "react";
import { roundRegistry } from "features/mock-interview/model/roundRegistry";

type Questions = Record<number, any>;
type Answers = Record<number, any>;

export type Round = "quiz" | "algo" | "matching-coding" | "system-design" | "result";
export type Framework = "react" | "javascript";
export type Level = "junior" | "mid-level" | "senior";

type InterviewState = {
  framework: Framework | null;
  setFramework: (framework: InterviewState["framework"]) => void;
  level: Level;
  currentRound: Round | null;
  answers: Answers;
  questions: Questions;
  setQuestions: (questions: Questions) => void;
  setLevel: (level: InterviewState["level"]) => void;
  nextRound: () => void;
  saveAnswers: (partial: Partial<Answers>) => void;
  reset: () => void;
};

const InterviewContext = createContext<InterviewState | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [framework, setFramework] = useState<InterviewState["framework"]>("javascript");
  const [level, setLevel] = useState<InterviewState["level"]>("junior");
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [questions, setQuestions] = useState<Questions>({});
  const nextRound = () => {
    setCurrentRound((_currentRound) => {
      if (_currentRound === null) {
        return roundRegistry[level][0];
      }

      const indexOf = roundRegistry[level].findIndex((r) => _currentRound === r);

      if (indexOf === roundRegistry[level].length - 1) {
        return "result";
      }

      return roundRegistry[level][indexOf + 1];
    });
  };
  const saveAnswers = (partial: Partial<Answers>) => setAnswers((prev) => ({ ...prev, ...partial }));
  const reset = () => {
    setFramework(null);
    setCurrentRound(null);
    setAnswers({});
  };

  return (
    <InterviewContext.Provider
      value={{
        framework,
        setFramework,
        level,
        currentRound,
        answers,
        questions,
        setQuestions,
        setLevel,
        nextRound,
        saveAnswers,
        reset,
      }}
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
