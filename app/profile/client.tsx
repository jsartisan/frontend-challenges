"use client";

import { Challenge } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { useCompletions } from "@/hooks/useCompletions";
import { ChallengeList } from "@/components/challenges/ChallengeList";

export default function Client(props: { challenges: Challenge[] }) {
  const auth = useAuth();
  const { challenges } = props;
  const { completions } = useCompletions();

  if (!auth.user) return redirect("/");

  return (
    <>
      <main className="h-full grow pb-16 md:order-1">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
          <div className="flex py-6">
            <div className="flex items-center gap-8">
              <img src={auth.user.avatar_url} alt="avatar" className="h-32 w-32 rounded-full" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{auth.user.name}</h1>
                <p className="text-fg-subtle text-lg ">{auth.user.user_name}</p>
              </div>
            </div>
          </div>
          <ChallengeList
            showTypeIcon
            challenges={challenges.filter((challenge) => completions.includes(challenge.no))}
          />
        </div>
      </main>
    </>
  );
}
