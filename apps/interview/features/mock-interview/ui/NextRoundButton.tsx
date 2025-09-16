import { useInterview } from "entities/interview/context/InterviewContext";

import { Button } from "~/components/ui";

import { roundRegistry } from "../model/roundRegistry";

export function NextRoundButton() {
  const { currentRound, level, nextRound } = useInterview();
  const currentRoundIndex = roundRegistry[level].findIndex((r) => r === currentRound);

  return (
    <Button
      onClick={() => {
        nextRound();
      }}
    >
      {currentRoundIndex < roundRegistry[level].length - 1 ? "Proceed to next round" : "Finish interview"}
    </Button>
  );
}
