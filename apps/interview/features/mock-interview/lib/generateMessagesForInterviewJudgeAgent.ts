import { MessageInput } from "@mastra/core/agent/message-list";

import { Level } from "../model/constants";

export function generateMessagesForInterviewJudgeAgent(level: Level, questions: any, answers: any) {
  const messages: MessageInput[] = [];

  for (const [round, qs] of Object.entries(questions)) {
    if (round === "quiz") continue;

    messages.push({
      role: "assistant",
      content: `Question:\n${qs.readmeRaw.en}\n`,
    });

    messages.push({
      role: "user",
      content: JSON.stringify(answers[round]) ?? "No answer provided.",
    });
  }

  console.log({ messages });

  return messages;
}
