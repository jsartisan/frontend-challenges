"use client";

import React from "react";

import { InterviewProvider } from "~/entities/interview/context/InterviewContext";

type Props = {
  children: React.ReactNode;
};

export default function MockInterviewLayout(props: Props) {
  const { children } = props;

  return <InterviewProvider>{children}</InterviewProvider>;
}
