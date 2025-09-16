import type { Level } from "entities/interview/context/InterviewContext";

import { MockInterviewQuizRoundPage } from "screens/mock-interview/ui/MockInterviewQuizRoundPage";
import { MockInterviewAlgoRoundPage } from "screens/mock-interview/ui/MockInterviewAlgoRoundPage";
import { MockInterviewSystemDesignRound } from "screens/mock-interview/ui/MockInterviewSystemDesignRound";
import { MockInterviewMachingCodingRoundPage } from "screens/mock-interview/ui/MockInterviewMachingCodingRoundPage";

export const COMPONENT_MAP = {
  quiz: MockInterviewQuizRoundPage,
  algo: MockInterviewAlgoRoundPage,
  "system-design": MockInterviewSystemDesignRound,
  "matching-coding": MockInterviewMachingCodingRoundPage,
} as const;

export const roundRegistry: Record<Level, (keyof typeof COMPONENT_MAP)[]> = {
  junior: ["quiz", "matching-coding"],
  "mid-level": ["quiz", "algo", "matching-coding"],
  senior: ["quiz", "algo", "matching-coding", "system-design"],
};
