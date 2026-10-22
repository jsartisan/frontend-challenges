import type { Metadata } from "next";

import { DOMAIN } from "~/shared/config/paths";

/**
 * Canonical origin of the site without a trailing slash.
 * Single source for sitemap, robots and canonical URLs so they always agree on the host.
 */
export const SITE_URL = DOMAIN.replace(/\/+$/, "");

/**
 * Builds an absolute canonical URL for a site path.
 * Query strings and hashes are stripped on purpose: filter / share / utility variants of a page
 * must canonicalize to the clean route.
 */
export function absoluteUrl(pathname = "/"): string {
  const clean = pathname.split(/[?#]/)[0] || "/";
  const withSlash = clean.startsWith("/") ? clean : `/${clean}`;

  return `${SITE_URL}${withSlash}`;
}

const MAX_DESCRIPTION_LENGTH = 160;

/**
 * Collapses whitespace and trims a description to a search-snippet friendly length without cutting a word.
 */
export function toDescription(text: string, max = MAX_DESCRIPTION_LENGTH): string {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= max) return normalized;

  const cut = normalized.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");

  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:!-]+$/, "")}…`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path of the page, e.g. `/challenges/1-rtl-icon`. Used for the canonical and og:url. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Per-page metadata: title, description, absolute canonical, and Open Graph fields that match the page
 * (page-level `openGraph` replaces the root layout one, so the image is repeated here).
 */
export function createPageMetadata(input: PageMetadataInput): Metadata {
  const { title, description, path, type = "website", publishedTime } = input;
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: "/og.png",
      ...(type === "article"
        ? { type: "article" as const, ...(publishedTime ? { publishedTime } : {}) }
        : { type: "website" as const }),
    },
  };
}
