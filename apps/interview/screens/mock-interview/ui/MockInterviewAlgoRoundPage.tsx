"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconCircle, IconCircleDot } from "@tabler/icons-react";
import { useInterview } from "entities/interview/context/InterviewContext";
import { useMockInterviewQuizzesByLevel } from "features/mock-interview/hooks/useChallengesForMockInterview";

import { cn } from "~/utils/helpers";
import { Button } from "~/components/ui";
import { Icon } from "~/components/ui/icon-2";
import { MDXComponent } from "~/shared/ui/mdx/MDXComponent";

export function MockInterviewAlgoRoundPage() {
  // const router = useRouter();
  // const { answers, level, saveAnswers } = useInterview();

  // useEffect(() => {
  //   if (!level) {
  //     return router.push("/mock-interview");
  //   }
  // }, [level]);

  return <div>Hello wolrd</div>;
}
