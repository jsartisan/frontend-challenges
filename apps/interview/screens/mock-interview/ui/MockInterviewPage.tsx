"use client";

import Image from "next/image";
import { useEffect } from "react";
import { LevelSelect } from "features/mock-interview/ui/LevelSelect";
import { useInterview } from "entities/interview/context/InterviewContext";
import { FrameworkSelect } from "features/mock-interview/ui/FrameworkSelect";

import logo from "~/public/images/logo.svg";

const levels = {
  1: 120,
  2: 240,
  3: 360,
};

export function MockInterviewPage() {
  return (
    <div className="flex-grow">
      <div className="desktop:h-[20vh] desktop:flex desktop:gap-32 desktop:bg-none relative isolate -z-10 mt-20 hidden flex-grow flex-col items-center justify-center gap-8 bg-[length:200%_200%] bg-center bg-no-repeat">
        <Image src={logo} alt="Ragby" width={50} height={50} />
        <div className="desktop:opacity-100 absolute opacity-60">
          <div className="desktop:size-[980px] relative grid size-[450px] place-items-center">
            <svg className="overflow-visible" width="100%" height="100%" viewBox="0 0 980 980">
              {Object.keys(levels).map((level) => (
                <circle
                  key={`ring-level-${level}`}
                  cx={490}
                  cy={490}
                  r={levels[level]}
                  fill="none"
                  strokeDasharray="4 4"
                  className="stroke-(--color-bd) desktop:stroke-(--color-bd) desktop:stroke-[1px] stroke-[3px]"
                  opacity={1}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
      <h1 className="box-trim mt-8 text-center text-4xl font-bold leading-normal">
        Simulate Real Interviews.
        <br />
        Sharpen Your Skills. Ace the Job.
      </h1>
      <p className="text-fg-subtle mx-auto mt-8 max-w-2xl text-center text-lg">
        Practice mock interviews, choose your level, answer realistic questions, and build confidence to excel in your
        next job interview.
      </p>
      <FrameworkSelect className="mt-6" />
      <LevelSelect className="mx-auto mt-6 flex justify-center" />
    </div>
  );
}
