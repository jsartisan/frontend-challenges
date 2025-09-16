"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconCircle, IconCircleDot } from "@tabler/icons-react";
import { useInterview } from "entities/interview/context/InterviewContext";
import { useInterviewJudge } from "features/mock-interview/hooks/useInterviewJudge";
import { useMockInterviewQuizzesByLevel } from "features/mock-interview/hooks/useChallengesForMockInterview";

import { cn } from "~/utils/helpers";
import { Button } from "~/components/ui";
import { Icon } from "~/components/ui/icon-2";
import { MDXComponent } from "~/shared/ui/mdx/MDXComponent";

export function MockInterviewResultPage() {
  const { data: result } = useInterviewJudge();
  return <div>Resultpage</div>;
}
