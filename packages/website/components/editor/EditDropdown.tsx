import { Challenge } from "@/shared";
import { Icon, IconButton } from "../ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type EditDropdownProps = {
  challenge: Challenge;
};

export default function EditDropdown(props: EditDropdownProps) {
  const { challenge } = props;

  return (
    <div className="flex items-center gap-2">
      <IconButton asChild variant="secondary" size="sm">
        <a href={challenge.githubURL} target="_blank" rel="noopener noreferrer">
          <Icon name="github" />
        </a>
      </IconButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton variant="tertiary" size="sm" className="ms-auto">
            <Icon name="vertical-dots" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild className="flex-col items-start">
            <a href={`${challenge.editURL}/README.md`} target="_blank" rel="noopener noreferrer" className="block">
              <div>Edit on Github</div>
              <div className="text-(--color-fg-neutral-subtle) text-xs">Edit description and info</div>
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
