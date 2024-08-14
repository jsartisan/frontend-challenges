import { DeepPartial } from "utility-types";
import { CATEGORIES, SUPPORTED_LOCALES, SUPPORTED_TEMPLATES } from "../constants";

export type Difficulty = "easy" | "medium" | "hard" | "extreme";
export type Importance = "hight" | "medium" | "low";

export type Challenge = Question | Quiz;
export type ChallengeSlim = Pick<Challenge, "no" | "difficulty" | "path" | "category">;

interface BaseChallengeProps {
  no: number;
  difficulty: Difficulty;
  path: string;
  readme: Record<string, string>;
  info: Record<string, DeepPartial<QuestionMetaInfo> | undefined>;
  category: Category;
  discussionURL?: string;
  githubURL?: string;
  editURL?: string;
}

interface BaseChallengeAnswerProps {
  title: string;
  author: string;
  author_url: string;
  author_avatar_url: string;
  url: string;
  no: number;
}

export interface Question extends BaseChallengeProps {
  templateFiles: Record<SupportedTemplates, Record<string, CodeFile>>;
  type: "question";
  answers?: (BaseChallengeAnswerProps & {
    files?: Record<string, CodeFile>;
    template: SupportedTemplates;
  })[];
}

export interface Quiz extends BaseChallengeProps {
  type: "quiz";
  solution: Record<string, string>;
}

export interface QuestionMetaInfo {
  title: string;
  author: {
    name: string;
    email: string;
    github: string;
    avatar_url: string;
  };
  template: SupportedTemplates;
  tags: string[];
  related?: string[];
  excerpt: string;
  published_date: string;
  type: "question" | "quiz";
  discussionNo: string;
}

export type SupportedTemplates = (typeof SUPPORTED_TEMPLATES)[number];
export type SupportedLocales = (typeof SUPPORTED_LOCALES)[number];

export type CodeFile = {
  code: string;
  hidden?: boolean;
  active?: boolean;
  readOnly?: boolean;
};

export type Blog = {
  title: string;
  path: string;
  slug: string;
  excerpt: string;
  published_at: string;
  tags: string[];
  code: string;
  emoji: string;
};

export type Category = (typeof CATEGORIES)[number];

export type StudyPlan = {
  title: string;
  path?: string;
  topics: {
    title: string;
    challenges: Challenge[];
  }[];
  info: Record<string, DeepPartial<StudyPlanInfo> | undefined>;
};

export type StudyPlanInfo = {
  title: string;
  description: string;
  topics: {
    title: string;
    challenges: string[];
  }[];
};
