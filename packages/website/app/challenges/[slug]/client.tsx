"use client";

import { Challenge } from "@/shared";
import { useEventTracking } from "@/web/hooks/useAnalytics";

import { Quiz } from "./Quiz";
import { Question } from "./Question";

type ClientProps = {
  challenge: Challenge;
};

export default function Client(props: ClientProps) {
  const { challenge } = props;

  const eventData = {
    challenge: challenge.no,
    title: challenge.info?.en?.title,
  };

  useEventTracking("Challenge Viewed", eventData, [challenge]);

  return challenge.type === "quiz" ? <Quiz challenge={challenge} /> : <Question challenge={challenge} />;
}
