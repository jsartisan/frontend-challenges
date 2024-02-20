import path from "path";
import { Difficulty } from "./types";
import { TEMPLATES } from "./templates";

export const ROOT_PATH = path.join(process.cwd());
export const CHALLENGES_ROOT = path.join(ROOT_PATH, "./challenges");
export const CONTENT_PATH = path.join(ROOT_PATH, "./content");

export const REPO = "https://github.com/jsartisan/frontend-challenges";
export const DOMAIN = process.env.NEXT_BASE_URL || "https://frontend-challenges.com";
export const DISCORD = "https://discord.gg/utqqFmhQmT";

export const DEFAULT_TEMPLATE = "vanilla";
export const SUPPORTED_TEMPLATES = Object.keys(TEMPLATES) as (keyof typeof TEMPLATES)[];

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en"] as const;

export const DIFFICULTY_COLORS = {
  warm: "teal",
  easy: "7aad0c",
  medium: "d9901a",
  hard: "de3d37",
  extreme: "b11b8d",
} as Record<Difficulty, string>;

export const CATEGORIES = ["css", "javascript", "react"];

export const DIFFICULTY_RANK = Object.keys(DIFFICULTY_COLORS) as (keyof typeof DIFFICULTY_COLORS)[];
