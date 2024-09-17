import { Challenge } from "packages/shared/src";
import { Icon, IconButton } from "../ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type EditDropdownProps = {
  challenge: Challenge;
};

export default function EditDropdown(props: EditDropdownProps) {
  const { challenge } = props;

  return (
    <div className="ms-auto flex items-center gap-1">
      <IconButton asChild variant="secondary" size="sm">
        <a href={challenge.githubURL} target="_blank" rel="noopener noreferrer">
          <Icon name="github" />
        </a>
      </IconButton>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton variant="tertiary" size="sm" className="ms-auto">
            <Icon name="vertical-dots" />
          </IconButton>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild className="flex-col items-start">
              <a href={`${challenge.editURL}/README.md`} target="_blank" rel="noopener noreferrer" className="block">
                <div>Edit on Github</div>
                <div className="text-xs text-[var(--color-fg-neutral-subtle)]">Edit description and info</div>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
