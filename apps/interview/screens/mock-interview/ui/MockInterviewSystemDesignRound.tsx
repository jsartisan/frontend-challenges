"use client";

import dynamic from "next/dynamic";
import { Editor, Tldraw } from "tldraw";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "tldraw/tldraw.css";
import { Round } from "features/mock-interview/model/constants";
import { useInterview } from "entities/interview/context/InterviewContext";
import { useChallengesForMockInterview } from "features/mock-interview/hooks/useChallengesForMockInterview";

import { MDXComponent } from "~/shared/ui/mdx/MDXComponent";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { Description } from "~/entities/challenge/ui/Description";
import { ResourceList } from "~/entities/resource/ui/ResourceList";
import { useLayout } from "~/features/code-editor/hooks/useLayout";
import { Button, Card, Separator, Skeleton } from "~/components/ui";
import { SandpackRoot } from "~/features/code-editor/ui/SandpackRoot";
import { LayoutChanger } from "~/features/code-editor/ui/LayoutChanger";
import { ResizableLayout } from "~/features/code-editor/ui/ResizableLayout";
import { TemplateChanger } from "~/features/code-editor/ui/TemplateChanger";
import { useChallengeFiles } from "~/features/code-editor/hooks/useChallengeFiles";
import { ResizableLayoutPanel } from "~/features/code-editor/ui/ResizableLayoutPanel";
import { Challenge, Question as QuestionType, SupportedTemplates } from "~/entities/challenge/model/types";

const Preview = dynamic(() => import("~/features/code-editor/ui/Preview").then((mod) => mod.Preview), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full grow" />,
});

const Console = dynamic(() => import("~/features/code-editor/ui/Console").then((mod) => mod.Console), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

const Editor = dynamic(() => import("~/entities/challenge/ui/Editor").then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

type MockInterviewAlgoRoundPageProps = {
  round: Round;
};

export function MockInterviewSystemDesignRound(props: MockInterviewAlgoRoundPageProps) {
  const { round } = props;
  const router = useRouter();
  const { answers, framework, level, saveAnswers } = useInterview();

  const {
    data: question,
    error,
    isLoading,
  } = useChallengesForMockInterview<QuestionType>({
    framework,
    level,
    round,
  });

  useEffect(() => {
    if (!level) {
      return router.push("/mock-interview");
    }
  }, [level]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>some error</div>;
  }

  if (!question) {
    return null;
  }

  return <Question challenge={question} round={round} />;
}

type QuestionProps = {
  challenge: QuestionType;
  round: Round;
};

export function Question(props: QuestionProps) {
  const { challenge } = props;
  const { round } = props;
  const editorRef = useRef<Editor | null>(null);

  return (
    <div className="flex w-full flex-grow flex-col p-6">
      <div className="flex items-center">
        <div className="flex flex-col">
          <h1 className="box-trim text-2xl font-bold">Round {round}: Sytem design Round</h1>
          <p className="text-fg-subtle mt-2">
            In this round, we will test your knowledge around Javascript/Typescript.
          </p>
        </div>
        <div className="ms-auto">
          <Button
            onClick={() => {
              if (!editorRef.current) return;

              const snapshot = editorRef.current.store.serialize();
              const jsonString = JSON.stringify(snapshot, null, 2);

              console.log({ jsonString });
            }}
          >
            Procceed to next round
          </Button>
        </div>
      </div>
      <div className="mt-6 flex grow flex-col gap-3">
        <h2 className="text-xl font-bold">Design facebook.com</h2>
        <Card className="relative grow overflow-hidden">
          <div className="absolute inset-0">
            <Tldraw
              onMount={(editor) => {
                editorRef.current = editor;
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
