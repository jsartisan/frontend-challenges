"use client";

import { useAuth } from "~/hooks/useAuth";
import { Skeleton } from "~/components/ui/skeleton";
import { UserDropdown } from "~/components/interfaces/auth/UserDropdown";
import { SignInButton } from "~/components/interfaces/auth/SignInButton";

export default function LoginNav() {
  const auth = useAuth();

  if (auth.isLoading) return <Skeleton className="size-8" />;

  if (auth.user) return <UserDropdown />;

  return <SignInButton />;
}
