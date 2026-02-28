import { useContext } from "react"

import { ButtonProps, Icon, IconButton, Tooltip, TooltipTrigger } from "~/components/ui"

import { SandpackLocalContext } from "../context/SandpackLocalProvider"

interface AddNewFileButtonProps {
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
  className?: string
}

export function AddNewFileButton(props: AddNewFileButtonProps) {
  const { className, size = "sm", variant = "tertiary" } = props
  const context = useContext(SandpackLocalContext)

  if (!context) {
    throw new Error("FileExplorer must be used within SandpackLocalProvider")
  }

  const { addFile } = context

  const handleAddFile = () => {
    const filename = prompt("Enter filename")

    if (filename) {
      addFile(`/${filename}`)
    }
  }

  return (
    <TooltipTrigger>
      <IconButton size={size} variant={variant} type="button" className={className} onPress={handleAddFile}>
        <Icon name="plus" size="sm" />
      </IconButton>
      <Tooltip>Add new file</Tooltip>
    </TooltipTrigger>
  )
}
