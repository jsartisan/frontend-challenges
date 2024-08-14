import { ChallengeSlim, DIFFICULTY_RANK } from "@frontend-challenges/shared";
import { useCompletions } from "./useCompletions";

export const useStats = (props: { challenges: ChallengeSlim[] }) => {
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
