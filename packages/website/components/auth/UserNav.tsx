"use client";

import { UserDropdown } from "./UserDropdown";
import { SignInButton } from "./SignInButton";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/web/hooks/useAuth";

export default function LoginNav() {
  const auth = useAuth();

  if (auth.isLoading) return <Skeleton className="size-8" />;

  if (auth.user) return <UserDropdown />;

  return <SignInButton />;
}
