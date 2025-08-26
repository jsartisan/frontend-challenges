"use client";

import * as React from "react";

import { Icon } from "./icon";
import { cn, getValidChildren } from "../..//utils/helpers";

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  /* The visual separator between each breadcrumb item */
  separator?: React.ReactNode;
  /**
   * If `true`, adds a separator between each breadcrumb item.
   * @default true
   */
  addSeparator?: boolean;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      addSeparator = true,
      children,
      className,
      separator = <Icon name="chevron-right" className="h-4 w-4" />,
      ...props
    },
    forwardedRef,
  ) => {
    const validChildren = getValidChildren(children);
    const clones = validChildren.map((child, index) => {
      return React.cloneElement(child, {
        addSeparator,
        separator,
        isLastChild: validChildren.length === index + 1,
      });
    });

    return (
      <nav className={cn("relative break-words", className)} aria-label="breadcrumb" {...props} ref={forwardedRef}>
        <ol className="flex items-center">{clones}</ol>
      </nav>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps extends BreadcrumbProps {
  /**
   * If `true`, indicates that the breadcrumb item is active, adds
   * `aria-current=page` and renders a `span`
   */
  isCurrentPage?: boolean;
  isLastChild?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ addSeparator, children, className, isCurrentPage, isLastChild, separator, ...props }, forwardedRef) => {
    const validChildren = getValidChildren(children);
    const clones = validChildren.map((child) => {
      if (child.type === BreadcrumbLink) {
        return React.cloneElement(child, { isCurrentPage });
      }

      if (child.type === BreadcrumbSeparator) {
        return React.cloneElement(child, {
          children: separator || child.props.children,
        });
      }

      return child;
    });

    return (
      <li className={cn("inline-flex items-center", className)} {...props} ref={forwardedRef}>
        {clones}
        {!isLastChild && addSeparator && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
      </li>
    );
  },
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<"a">,
    Pick<BreadcrumbItemProps, "isCurrentPage"> {
  as?: React.ElementType;
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ as: asComp, className, isCurrentPage, ...props }, forwardedRef) => {
    const Comp = (isCurrentPage ? "span" : asComp || "a") as "a";

    return (
      <Comp
        className={cn(
          "flex items-center gap-2 text-sm font-medium underline-offset-4 aria-[current]:opacity-60 [&:not([aria-current])]:hover:underline",
          className,
        )}
        aria-current={isCurrentPage ? "page" : undefined}
        {...props}
        ref={forwardedRef}
      />
    );
  },
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<"span">;

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, ...props }, forwardedRef) => {
    return <span className={cn("mx-2 opacity-50", className)} role="presentation" {...props} ref={forwardedRef} />;
  },
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
