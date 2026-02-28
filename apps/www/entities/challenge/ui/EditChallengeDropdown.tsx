import { Icon, IconButton } from "~/components/ui";
import { type Challenge } from "~/entities/challenge/model/types";
import { Tooltip, TooltipTrigger } from "~/components/ui/tooltip";
import {
  MenuTrigger,
  Menu,
  MenuItem,
} from "~/components/ui/dropdown-menu";

type EditDropdownProps = {
  challenge: Challenge;
};

export function EditChallengeDropdown(props: EditDropdownProps) {
  const { challenge } = props;

  return (
    <div className="flex items-center gap-2">
      <TooltipTrigger delay={0}>
        <IconButton variant="ghost" size="sm">
          <a href={challenge.githubURL} target="_blank" rel="noopener noreferrer">
            <Icon name="github" />
          </a>
        </IconButton>
        <Tooltip>Go to github</Tooltip>
      </TooltipTrigger>
      <MenuTrigger>
        <IconButton variant="ghost" size="sm" className="ms-auto">
          <Icon name="vertical-dots" />
        </IconButton>
        <Menu placement="bottom end">
          <MenuItem href={`${challenge.editURL}/README.md`} target="_blank" className="flex-col items-start">
            <div>Edit on Github</div>
            <div className="text-muted-foreground/60 text-xs">Edit description and info</div>
          </MenuItem>
        </Menu>
      </MenuTrigger>
    </div>
  );
}
