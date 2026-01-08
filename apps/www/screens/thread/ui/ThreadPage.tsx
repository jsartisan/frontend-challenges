"use client";

import { useRef, useState } from "react";

import { cn } from "~/utils/helpers";
import { Logo } from "~/shared/ui/Logo";
import { Avatar } from "~/components/ui/Avatar";
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

// Static mock data for messages
const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Can you explain how CSS Flexbox works?",
  },
  {
    id: "2",
    role: "assistant",
    content: `CSS Flexbox is a one-dimensional layout method for arranging items in rows or columns. Here's a quick overview:

**Key Concepts:**

1. **Flex Container** - The parent element with \`display: flex\`
2. **Flex Items** - The direct children of the flex container

**Main Properties:**

\`\`\`css
.container {
  display: flex;
  flex-direction: row; /* or column */
  justify-content: center; /* main axis alignment */
  align-items: center; /* cross axis alignment */
  gap: 1rem; /* space between items */
}
\`\`\`

**Common Use Cases:**
- Centering content vertically and horizontally
- Creating navigation bars
- Building card layouts
- Distributing space evenly between items

Would you like me to explain any specific flexbox property in more detail?`,
  },
];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ThreadPageProps = {
  threadId: string;
  initialMessage?: string;
};

export function ThreadPage({ initialMessage, threadId }: ThreadPageProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialMessage) {
      return [
        {
          id: "initial",
          role: "user" as const,
          content: initialMessage,
        },
      ];
    }
    return INITIAL_MESSAGES;
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (message: PromptInputMessage) => {
    if (!message.text?.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message.text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "This is a static response. In a real implementation, this would be connected to an AI backend using the Vercel AI SDK.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <Avatar name="AI" size="sm" className="shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
                  <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="">
        <div className="mx-auto max-w-2xl px-4 pb-4">
          <PromptInput onSubmit={handleSubmit} className="relative" globalDrop multiple>
            <PromptInputBody>
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Ask a follow-up question..."
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools />
              <PromptInputSubmit disabled={!input.trim()} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-4", isUser && "flex-row-reverse")}>
      <Avatar name={isUser ? "You" : "AI"} size="sm" className="shrink-0" />

      <div className={cn("flex-1 space-y-2", isUser && "flex flex-col items-end")}>
        <div
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none rounded-2xl px-4 py-3",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted",
          )}
        >
          <MessageContent content={message.content} />
        </div>
      </div>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  // Simple markdown-like rendering for code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("```")) {
          const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
          if (match) {
            const [, language, code] = match;
            return (
              <pre key={index} className="bg-background/50 my-2 overflow-x-auto rounded-lg p-3 text-sm">
                <code>{code.trim()}</code>
              </pre>
            );
          }
        }

        // Handle bold text
        const formattedText = part.split(/(\*\*.*?\*\*)/g).map((segment, i) => {
          if (segment.startsWith("**") && segment.endsWith("**")) {
            return <strong key={i}>{segment.slice(2, -2)}</strong>;
          }
          // Handle line breaks
          return segment.split("\n").map((line, j, arr) => (
            <span key={`${i}-${j}`}>
              {line}
              {j < arr.length - 1 && <br />}
            </span>
          ));
        });

        return <span key={index}>{formattedText}</span>;
      })}
    </>
  );
}
