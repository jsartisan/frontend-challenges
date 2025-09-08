import { useContext } from "react";

import { ButtonProps, Icon, IconButton, Tooltip } from "~/components/ui";

import { SandpackLocalContext } from "../context/SandpackLocalProvider";

interface AddNewFileButtonProps {
  size?: ButtonProps["size"];
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

export function AddNewFileButton(props: AddNewFileButtonProps) {
  const { className, size = "sm", variant = "tertiary" } = props;
  const context = useContext(SandpackLocalContext);

  if (!context) {
    throw new Error("FileExplorer must be used within SandpackLocalProvider");
  }

  const { addFile } = context;

  const handleAddFile = () => {
    const filename = prompt("Enter filename");

    if (filename) {
      addFile(`/${filename}`);
    }
  };

  return (
    <Tooltip content="Add new file">
      <IconButton size={size} variant={variant} type="button" className={className} onClick={handleAddFile}>
        <Icon name="plus" size="sm" />
      </IconButton>
    </Tooltip>
  );
}
