import { type ChallengeSlim } from "~/entities/challenge/model/types";
import { DIFFICULTY_RANK } from "~/entities/challenge/model/constants";
import { useCompletions } from "~/entities/completions/hooks/useCompletions";

export const useCompletionStats = (props: { challenges: ChallengeSlim[] }) => {
  const { challenges } = props;
  const { completions } = useCompletions();

  const stats = DIFFICULTY_RANK.reduce(
    (acc, difficulty) => {
      const difficultyChallenges = challenges.filter((challenge) => challenge.difficulty === difficulty);
      const completedChallenges = difficultyChallenges.filter((challenge) =>
        completions.includes(`challenge-${challenge.no}`),
      );
      const totalCompletedPercentage = (completedChallenges.length / difficultyChallenges.length) * 100;

      return {
        ...acc,
        [difficulty]: {
          total: difficultyChallenges.length,
          completed: completedChallenges.length,
          percentage: isNaN(totalCompletedPercentage) ? 0 : totalCompletedPercentage,
        },
      };
    },
    {} as Record<string, { total: number; completed: number; percentage: number }>,
  );

  return { stats };
};
