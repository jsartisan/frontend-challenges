import { Difficulty } from "./types";
import { TEMPLATES } from "./templates";

export const ROOT_PATH = process.cwd();
export const IS_WEBSITE_ROOT = ROOT_PATH.endsWith("website");

export const CONTENT_PATH = "./content";
export const CHALLENGES_ROOT = IS_WEBSITE_ROOT ? "../../challenges" : "./challenges";
export const STUDY_PLANS_ROOT = IS_WEBSITE_ROOT ? "../../study-plans" : "./study-plans";

export const REPO = "https://github.com/jsartisan/frontend-challenges";
export const REPO_API = "https://api.github.com/repos/jsartisan/frontend-challenges";
export const DOMAIN = process.env.NEXT_BASE_URL || "https://frontend-challenges.com";
export const DISCORD = "https://discord.gg/utqqFmhQmT";
export const DISCUSSIONS = "https://github.com/jsartisan/frontend-challenges/discussions";

export const DEFAULT_TEMPLATE = "vanilla";
export const SUPPORTED_TEMPLATES = Object.keys(TEMPLATES) as (keyof typeof TEMPLATES)[];

export const TRANSLATIONS = {
  en: require("../../../locales/en.json"),
} as const;
export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = Object.keys(TRANSLATIONS) as (keyof typeof TRANSLATIONS)[];

export const DIFFICULTY_COLORS = {
  warm: "teal",
  easy: "7aad0c",
  medium: "d9901a",
  hard: "de3d37",
  extreme: "b11b8d",
} as Record<Difficulty, string>;

export const CATEGORIES = ["javascript", "css", "react"] as const;

export const DIFFICULTY_RANK = Object.keys(DIFFICULTY_COLORS) as (keyof typeof DIFFICULTY_COLORS)[];
