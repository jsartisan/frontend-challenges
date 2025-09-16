"use server";

import { RuntimeContext } from "@mastra/core/runtime-context";
import { Level } from "entities/interview/context/InterviewContext";
import { generateMessagesForInterviewJudgeAgent } from "features/mock-interview/lib/generateMessagesForInterviewJudgeAgent";

import { mastra } from "../../../mastra";

export async function POST(request: Request) {
  const body = await request.json();
  const agent = mastra.getAgent("interviewJudgeAgent");

  const runtimeContext = new RuntimeContext<{ level: Level }>();
  runtimeContext.set("level", body.level);

  const messages = generateMessagesForInterviewJudgeAgent(body.level, body.questions, body.answers);
  const result = await agent.generate(messages, {
    runtimeContext,
  });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
