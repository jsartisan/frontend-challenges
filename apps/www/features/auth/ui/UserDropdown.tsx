"use client";

import { IconButton } from "~/components/ui";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { signOut } from "~/features/auth/api/sign-out";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import {
  MenuTrigger,
  Menu,
  MenuItem,
  MenuSeparator,
  MenuSection,
} from "~/components/ui/dropdown-menu";
import { Header } from "react-aria-components";

export function UserDropdown() {
  const auth = useAuth();

  return (
    <>
      <MenuTrigger>
        <IconButton variant="ghost" className="relative overflow-hidden">
          <Avatar className="h-full w-full rounded-none">
            <AvatarImage className="h-full! w-full!" src={auth.user?.avatar_url ?? undefined} alt="@shadcn" />
          </Avatar>
        </IconButton>
        <Menu placement="bottom end" className="w-56">
          <MenuSection>
            <Header className="px-2 py-1.5 font-normal">
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{auth.user?.name}</p>
                  <p className="text-muted-foreground text-xs leading-none">{auth.user?.user_name}</p>
                </div>
              </div>
            </Header>
          </MenuSection>
          <MenuSeparator />
          <MenuItem
            onAction={async () => {
              await signOut();
            }}
          >
            Log out
          </MenuItem>
        </Menu>
      </MenuTrigger>
    </>
  );
}
