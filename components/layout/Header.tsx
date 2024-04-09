import { REPO } from "@/constants";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { IconButton } from "../ui";
import { Logo } from "../common/Logo";
import { Separator } from "../ui/separator";
import { ThemeChanger } from "../common/ThemeChanger";
import { SubmissionNavigator } from "../common/SubmissionNavigator";
import { SpotLight } from "../common/Spotlight";
import { SearchItem } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { LoginNav } from "@/app/auth/UserNav";

type HeaderProps = {
  challenges: SearchItem[];
};

export async function Header(props: HeaderProps) {
  const { challenges } = props;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <>
      <div className="sticky top-0 z-30 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)] bg-opacity-5 backdrop-blur-md transition-[background-color]">
        <div className="mx-auto px-4 sm:px-6">
          <div className="flex h-[var(--navbar-height)] items-center justify-between md:justify-start md:gap-4">
            <div className="flex items-center justify-start gap-3">
              <Logo />
              <SpotLight items={challenges} />
            </div>
            <div className="ms-auto flex h-full items-center gap-2">
              <LoginNav user={data.user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
