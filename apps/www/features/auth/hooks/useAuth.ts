"use client";

import { authClient } from "~/shared/lib/auth/client";

export function useAuth() {
  const { data: session, isPending } = authClient.useSession();

  return {
    isLoading: isPending,
    user: session?.user
      ? {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          avatar_url: session.user.image,
          user_name: session.user.name,
        }
      : null,
  };
}
