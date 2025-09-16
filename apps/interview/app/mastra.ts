import { Mastra } from "@mastra/core/mastra";
import { interviewJudgeAgent } from "features/mock-interview/agents/interviewJudgeAgent";

export const mastra = new Mastra({
  agents: { interviewJudgeAgent },
});
