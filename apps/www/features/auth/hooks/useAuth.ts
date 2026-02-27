"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    isLoading: status === "loading",
    user: session?.user
      ? {
          id: session.user.id as string,
          name: session.user.name,
          email: session.user.email,
          avatar_url: session.user.image,
          user_name: session.user.name,
        }
      : null,
  };
}
