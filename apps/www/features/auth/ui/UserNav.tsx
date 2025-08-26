"use client";

import { Skeleton } from "~/components/ui/skeleton";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { UserDropdown } from "~/features/auth/ui/UserDropdown";
import { SignInButton } from "~/features/auth/ui/SignInButton";

export default function LoginNav() {
  const auth = useAuth();

  if (auth.isLoading) return <Skeleton className="size-8" />;

  if (auth.user) return <UserDropdown />;

  return <SignInButton />;
}
