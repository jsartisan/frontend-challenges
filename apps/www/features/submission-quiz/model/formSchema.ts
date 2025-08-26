import { z } from "zod";

import { Difficulty } from "~/entities/challenge/model/types";
import { DIFFICULTY_RANK } from "~/entities/challenge/model/constants";

export const formSchema = z.object({
  title: z.string().min(2).max(50),
  template: z.string().optional(),
  readme: z.string(),
  tags: z.string(),
  files: z.any().optional(),
  type: z.enum(["question", "quiz", "theory"]),
  answer: z.string().optional(),
  difficulty: z.enum(DIFFICULTY_RANK as [Difficulty]),
});
