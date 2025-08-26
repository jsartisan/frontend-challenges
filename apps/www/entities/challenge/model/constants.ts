import { Difficulty } from "./types";
import { TEMPLATES } from "./templates";

// root
export const CHALLENGES_ROOT = "../../challenges";

// difficulty
export const DIFFICULTY_COLORS = {
  easy: "7aad0c",
  medium: "d9901a",
  hard: "de3d37",
  extreme: "b11b8d",
} as Record<Difficulty, string>;

export const DIFFICULTY_RANK = Object.keys(DIFFICULTY_COLORS) as (keyof typeof DIFFICULTY_COLORS)[];

// templates
export const DEFAULT_TEMPLATE = "vanilla";
export const SUPPORTED_TEMPLATES = Object.keys(TEMPLATES) as (keyof typeof TEMPLATES)[];
export { TEMPLATES };
