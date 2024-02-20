"use client";

import { Challenge } from "@/types";

import { Quiz } from "./Quiz";
import { Question } from "./Question";

export default function Client(props: { challenge: Challenge }) {
  const { challenge } = props;

  return challenge.type === "question" ? <Question question={challenge} /> : <Quiz quiz={challenge} />;
}
