"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

import { Button } from "~/components/ui/Button";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "~/components/ui/PromptInput";

import { HeroImage } from "./HeroImage";

export function HomePage() {
  const router = useRouter();
  const [text, setText] = useState("");

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text?.trim()) return;

    // Generate a unique thread ID and navigate to the thread page
    const threadId = nanoid(10);
    const searchParams = new URLSearchParams({ q: message.text });
    router.push(`/thread/${threadId}?${searchParams.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="relative flex w-full max-w-2xl flex-col items-center">
        <div className="flex h-40 items-center justify-center">
          <HeroImage />
        </div>

        {/* Content overlaid on top */}
        <div className="relative z-10 -mt-20 w-full space-y-8 py-32">
          <div className="text-center">
            <h1 className="text-(--color-fg) text-3xl font-semibold">What do you want to learn?</h1>
            <p className="text-(--color-fg-muted) mt-2">Ask anything about HTML, CSS, or JavaScript</p>
          </div>

          <div className="w-full max-w-2xl">
            <PromptInput onSubmit={handleSubmit} className="relative" globalDrop multiple>
              <PromptInputBody>
                <PromptInputTextarea
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  className=""
                  placeholder="Ask me anything..."
                />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputTools />
                <PromptInputSubmit disabled={!text.trim()} />
              </PromptInputFooter>
            </PromptInput>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Flexbox basics", "CSS Grid layout", "JavaScript closures", "DOM manipulation"].map((suggestion) => (
              <Button key={suggestion} onClick={() => setText(suggestion)} variant="outline" className="shadow-none">
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
