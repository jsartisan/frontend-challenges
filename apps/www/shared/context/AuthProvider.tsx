"use client";

// Better Auth doesn't require a provider wrapper like NextAuth's SessionProvider.
// This component is kept for backwards compatibility but just passes through children.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
