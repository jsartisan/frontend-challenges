"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks";

export function UserDropdown() {
  const auth = useAuth();
  const { logout, isLoggingOut } = useLogout();

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
            onSelect={(event) => {
              event.preventDefault();

              logout();
            }}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
