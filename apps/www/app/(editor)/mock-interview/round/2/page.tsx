"use client";

import React from "react";

import { useInterview } from "~/entities/interview/context/InterviewContext";
import { MockInterviewSystemDesignRound } from "~/screens/mock-interview/ui/MockInterviewSystemDesignRound";
import { MockInterviewMachingCodingRoundPage } from "~/screens/mock-interview/ui/MockInterviewMachingCodingRoundPage";

export default function Page() {
  const { level } = useInterview();

  if (level === "junior") {
    return <MockInterviewSystemDesignRound round={2} />;
  }

  return <MockInterviewSystemDesignRound round={2} />;
}
