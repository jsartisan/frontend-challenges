"use client";

import Link from "next/link";

import { IconButton } from "~/components/ui";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { createClient } from "~/shared/api/supabase/client";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function UserDropdown() {
  const auth = useAuth();
  const supabase = createClient();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <IconButton variant="tertiary" className="relative overflow-hidden">
            <Avatar className="h-full w-full rounded-none">
              <AvatarImage src={auth.user?.avatar_url ?? undefined} alt="@shadcn" />
            </Avatar>
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{auth.user?.name}</p>
                <p className="text-muted-foreground text-xs leading-none">{auth.user?.user_name}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
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
    </>
  );
}
