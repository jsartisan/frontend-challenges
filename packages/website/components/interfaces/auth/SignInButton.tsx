"use client";

import { createClient } from "@/web/utils/supabase/client";

import { Button, Icon } from "@/web/components/ui";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/web/components/ui/popover";
import { useUiStore } from "@/web/store/ui";
import Link from "next/link";

export function SignInButton() {
  const ui = useUiStore();
  const supabase = createClient();

  const onLoginWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      console.error("Error logging in:", error.message);

      return;
    }
  };

  return (
    <>
      <Popover open={ui.isLoginModalOpen} onOpenChange={(open) => ui.toggleLoginModal(open)}>
        <PopoverTrigger asChild>
          <Button variant="secondary" onClick={() => ui.toggleLoginModal(true)}>
            Sign In
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px]" align="end">
          <PopoverArrow />
          <div className="space-y-2">
            <div className="flex flex-col gap-4">
              <div className="space-y-1 text-center">
                <h5 className="font-medium">Sign Up / In</h5>
                <p className="text-(--color-fg-subtle) text-sm">Sign in to save and track your progress.</p>
              </div>
              <div className="relative flex flex-col items-center justify-center space-y-2 overflow-hidden rounded px-5 py-6 shadow-md">
                <button onClick={onLoginWithGithub} className="group block cursor-pointer">
                  <span
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(/images/auth-github-bg.png)` }}
                  ></span>
                  <div
                    data-size="tiny"
                    className="font-regular hover:text-border-stronger focus-visible:text-border-control border-foreground-light hover:border-foreground-lighter focus-visible:outline-border-strong data-[state=open]:border-foreground-lighter data-[state=open]:outline-border-strong text-forground shadow-xs outline-hidden relative inline-flex h-[26px] cursor-pointer items-center justify-center space-x-2 rounded-md border bg-white px-2.5 py-1 text-center text-xs outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
                  >
                    <Icon name="github" size="sm" />
                    <span className="truncate">Login with Github</span>
                  </div>
                </button>
              </div>
              <p className="text-muted-foreground px-2 text-center text-sm">
                By clicking continue, you agree to our{" "}
                <Link href="/terms" className="hover:text-primary underline underline-offset-4">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="hover:text-primary underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
