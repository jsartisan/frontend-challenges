"use client";

import { Header } from "widgets/Header";
import { useInterview } from "entities/interview/context/InterviewContext";
import { MockInterviewPage } from "screens/mock-interview/ui/MockInterviewPage";
import { COMPONENT_MAP, roundRegistry } from "features/mock-interview/model/roundRegistry";
import { MockInterviewResultPage } from "screens/mock-interview/ui/MockInterviewResultPage";

export default function Page() {
  const { currentRound, level } = useInterview();

  console.log({ currentRound });

  if (currentRound === null || !level) {
    return <MockInterviewPage />;
  }

  const currentRoundIndex = roundRegistry[level].findIndex((r) => r === currentRound);

  if (currentRound === "result") {
    return <MockInterviewResultPage />;
  }

  const PageComponent = COMPONENT_MAP[roundRegistry[level][currentRoundIndex]];

  if (!PageComponent) return null;

  return (
    <>
      <Header />
      <PageComponent round={currentRound} />
    </>
  );
}
