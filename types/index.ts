import type IO from "@actions/io";
import type Core from "@actions/core";
import { DeepPartial } from "utility-types";
import type { context, getOctokit } from "@actions/github";
import { CATEGORIES, SUPPORTED_LOCALES, SUPPORTED_TEMPLATES } from "@/constants";

export type Difficulty = "warm" | "easy" | "medium" | "hard" | "extreme" | "pending";
export type Importance = "hight" | "medium" | "low";

export type Challenge = Question | Quiz;

export interface Question {
  no: number;
  difficulty: Difficulty;
  path: string;
  readme: Record<string, string>;
  templateFiles: Record<SupportedTemplates, Record<string, CodeFile>>;
  info: Record<string, DeepPartial<QuestionMetaInfo> | undefined>;
  type: "question";
  answers?: {
    files?: Record<string, CodeFile>;
    title: string;
    author: string;
    author_url: string;
    author_avatar_url: string;
    url: string;
    no: number;
    template: SupportedTemplates;
  }[];
  category: Category;
}

export interface Quiz {
  no: number;
  difficulty: Difficulty;
  path: string;
  readme: Record<string, string>;
  type: "quiz";
  info: Record<string, DeepPartial<Omit<QuestionMetaInfo, "template">> | undefined>;
  solution: Record<string, string>;
  answers: {
    title: string;
    author: string;
    author_url: string;
    author_avatar_url: string;
    url: string;
    no: number;
    body: string;
  }[];
  category: Category;
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
}

export type SupportedTemplates = (typeof SUPPORTED_TEMPLATES)[number];
export type SupportedLocales = (typeof SUPPORTED_LOCALES)[number];

export type CodeFile = {
  code: string;
  hidden?: boolean;
  active?: boolean;
  readOnly?: boolean;
};

export type Context = typeof context;
export type Github = ReturnType<typeof getOctokit>;
export type Action = (github: Github, context: Context, core: typeof Core, io: typeof IO) => Promise<void>;

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

export type SearchItem = {
  title?: string;
  path?: string;
};
