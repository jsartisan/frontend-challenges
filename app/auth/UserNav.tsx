"use client";

import { createClient } from "@/utils/supabase/client";

import { Button, Icon, IconButton } from "@/components/ui";
import { PopoverTrigger, PopoverContent, Popover, PopoverArrow } from "@/components/ui/popover";
import { useUiStore } from "@/store/ui";
import type { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserNavProps = {
  user: User | null;
};

export function LoginNav(props: UserNavProps) {
  const { user } = props;
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

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton variant="tertiary" className="relative overflow-hidden">
            <Avatar className="h-full w-full rounded-none">
              <AvatarImage src={user?.user_metadata.avatar_url} alt="@shadcn" />
              <AvatarFallback>
                <Icon name="eye" />
              </AvatarFallback>
            </Avatar>
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.user_metadata.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.user_metadata.user_name}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await supabase.auth.signOut();

              window.location.reload();
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Popover open={ui.isLoginModalOpen} onOpenChange={(open) => ui.toggleLoginModal(open)}>
        <PopoverTrigger asChild>
          <Button variant="tertiary" onClick={() => ui.toggleLoginModal(true)}>
            Sign In
          </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="end">
          <PopoverArrow />
          <div className="space-y-2">
            <div className="space-y-1">
              <h5 className="font-medium">Sign Up / In</h5>
              <p className=" text-sm text-[var(--color-fg-subtle)]">Sign in to save and track your progress.</p>
            </div>
            <div className="">
              <div className=" relative flex items-center justify-center space-y-2 overflow-hidden rounded px-5 py-6 shadow-md">
                <button onClick={onLoginWithGithub} className="group block cursor-pointer">
                  <span className="absolute inset-0 bg-cover bg-center bg-no-repeat">
                    <img
                      alt="discord illustration header"
                      src="https://www.freecodecamp.org/news/content/images/size/w2000/2021/10/github-on-the-hunt-for-a-new-diversity-lead-developers-techworld-github-universe-png-800_450.png"
                      className="absolute left-0 top-0 "
                    />
                  </span>
                  <div
                    data-size="tiny"
                    className="font-regular hover:text-border-stronger focus-visible:text-border-control border-foreground-light hover:border-foreground-lighter focus-visible:outline-border-strong data-[state=open]:border-foreground-lighter data-[state=open]:outline-border-strong relative inline-flex h-[26px] cursor-pointer items-center justify-center space-x-2 rounded-md border bg-white px-2.5 py-1 text-center text-xs text-background shadow-sm outline-none outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
                  >
                    <Icon name="github" size="sm" />
                    <span className="truncate">Login with Github</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
