"use client"

import * as React from "react"

import { cn } from "~/utils/helpers"

type AvatarContextValue = {
  imageLoadingStatus: "idle" | "loading" | "loaded" | "error"
  onImageLoadingStatusChange: (status: "loading" | "loaded" | "error") => void
}

const AvatarContext = React.createContext<AvatarContextValue | undefined>(
  undefined
)

function useAvatarContext() {
  const context = React.useContext(AvatarContext)
  if (!context) {
    throw new Error("Avatar components must be used within Avatar")
  }
  return context
}

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {}

function Avatar({ className, ...props }: AvatarProps) {
  const [imageLoadingStatus, setImageLoadingStatus] = React.useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle")

  return (
    <AvatarContext.Provider
      value={{
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
      }}
    >
      <span
        data-slot="avatar"
        className={cn(
          "relative flex size-8 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      />
    </AvatarContext.Provider>
  )
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

function AvatarImage({ className, src, alt, ...props }: AvatarImageProps) {
  const { onImageLoadingStatusChange } = useAvatarContext()
  const [loadingStatus, setLoadingStatus] = React.useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle")

  React.useEffect(() => {
    if (!src) {
      onImageLoadingStatusChange("error")
      return
    }

    let isMounted = true
    const image = new window.Image()

    const updateStatus = (status: "loading" | "loaded" | "error") => {
      if (!isMounted) return
      setLoadingStatus(status)
      onImageLoadingStatusChange(status)
    }

    updateStatus("loading")

    image.onload = () => updateStatus("loaded")
    image.onerror = () => updateStatus("error")
    image.src = typeof src === "string" ? src : URL.createObjectURL(src)

    return () => {
      isMounted = false
    }
  }, [src, onImageLoadingStatusChange])

  if (loadingStatus !== "loaded") {
    return null
  }

  return (
    <img
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      src={src}
      alt={alt}
      {...props}
    />
  )
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  delayMs?: number
}

function AvatarFallback({ className, delayMs, ...props }: AvatarFallbackProps) {
  const { imageLoadingStatus } = useAvatarContext()
  const [canRender, setCanRender] = React.useState(delayMs === undefined)

  React.useEffect(() => {
    if (delayMs === undefined) return

    const timerId = window.setTimeout(() => setCanRender(true), delayMs)
    return () => window.clearTimeout(timerId)
  }, [delayMs])

  if (!canRender || imageLoadingStatus === "loaded") {
    return null
  }

  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
