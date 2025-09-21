import { DeepPartial } from "utility-types";

import { Category } from "~/entities/category/model/types";
import { SUPPORTED_TEMPLATES } from "~/entities/challenge/model/constants";

export type Difficulty = "easy" | "medium" | "hard" | "extreme";
export type Importance = "hight" | "medium" | "low";
export type Level = "junior" | "mid-level" | "senior";

export type Challenge = Question | Quiz | Theory;
export type ChallengeList = ChallengeSlim[];
export type ChallengeSlim = Pick<Challenge, "no" | "difficulty" | "path" | "category" | "info" | "type" | "readme"> & {
  templatesAvailable: SupportedTemplates[];
};

interface BaseChallengeProps {
  no: number;
  difficulty: Difficulty;
  path: string;
  readme: Record<string, string>;
  info: Record<string, DeepPartial<QuestionMetaInfo> | undefined>;
  category?: Category;
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

export interface Theory extends BaseChallengeProps {
  type: "theory";
  content: string;
}

export interface QuestionMetaInfo {
  title: string;
  difficulty: Difficulty;
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
  type: "question" | "quiz" | "theory";
  discussionNo: string;
  resources?: string[];
  level?: Level | Level[];
  options?: string[];
  right_answer?: string;
}

export type SupportedTemplates = (typeof SUPPORTED_TEMPLATES)[number];

export type CodeFile = {
  code: string;
  hidden?: boolean;
  active?: boolean;
  readOnly?: boolean;
};
