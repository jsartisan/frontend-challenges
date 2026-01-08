"use client";

import * as React from "react";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "~/utils/helpers";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image (required for accessibility if `src` is provided) */
  alt?: string;
  /** Custom fallback node that is shown when the image fails to load or `src` is not provided. */
  fallback?: React.ReactNode;
  /** A name that will be converted to initials and shown as the fallback when `fallback` is not provided. */
  name?: string;
}

/**
 * Design tokens for Avatar.
 * - `base` contains shared styles for every avatar.
 * - `size` controls both the overall avatar size and the font-size of the fallback.
 */
export const avatarVariants = tv({
  base: cn(
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xs font-medium uppercase select-none", // uppercase for initials
  ),
  variants: {
    size: {
      "2xs": "size-4 text-[10px]",
      xs: "size-6 text-[10px]",
      sm: "size-8 text-xs",
      md: "size-10 text-sm",
      lg: "size-12 text-base",
      xl: "size-14 text-lg",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

/**
 * Avatar component similar to Radix UI's `Avatar`.
 *
 * ```tsx
 * <Avatar src="/user.png" name="Ada Lovelace" size="md" />
 * ```
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const { alt, className, fallback, name, size, src, ...rest } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Compute initials from name (max 2 letters)
  const getInitials = React.useCallback((value?: string) => {
    if (!value) return "";
    const words = value.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return "";
    if (words.length === 1) return words[0][0]?.toUpperCase() ?? "";
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }, []);

  return (
    <span ref={ref} className={avatarVariants({ size, className })} {...rest}>
      {src && (
        <img
          src={src}
          alt={alt ?? name ?? ""}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(false)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-200",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {/* Render fallback while image is loading or when it fails */}
      {(!src || !isLoaded) && (
        <span className="bg-background flex size-full shrink-0 items-center justify-center rounded-md border">
          {fallback ?? <span aria-hidden="true">{getInitials(name) || "?"}</span>}
        </span>
      )}
    </span>
  );
});

Avatar.displayName = "Avatar";
