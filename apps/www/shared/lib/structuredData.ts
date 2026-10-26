import type { Category } from "~/entities/category/model/types";
import type { ChallengeSlim } from "~/entities/challenge/model/types";

import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { describeChallenge } from "~/shared/lib/describeChallenge";
import { SITE_URL, absoluteUrl } from "~/shared/lib/seo";

export const SITE_NAME = "Frontend Challenges";

/** Same wording as the root layout description; kept here so structured data does not depend on the layout file. */
export const SITE_DESCRIPTION =
  "Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you prepare for frontend interviews. It's free and open source.";

const CONTEXT = "https://schema.org";

const TYPE_LABEL: Record<string, string> = {
  question: "coding challenge",
  quiz: "quiz",
  theory: "theory question",
};

type Crumb = { name: string; path: string };

function websiteRef() {
  return { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/` };
}

/** Accepts the Date objects js-yaml produces for unquoted `2024-01-03` values, or any date string. */
function toIsoDate(value: unknown): string | undefined {
  if (!value) return undefined;

  // Blog frontmatter uses MM/DD/YYYY; read it as a calendar date so the build machine's timezone cannot shift the day.
  const us = typeof value === "string" ? value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) : null;

  if (us) return `${us[3]}-${us[1].padStart(2, "0")}-${us[2].padStart(2, "0")}`;

  const date = value instanceof Date ? value : new Date(String(value));

  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function itemList(challenges: ChallengeSlim[]) {
  return {
    "@type": "ItemList",
    numberOfItems: challenges.length,
    itemListElement: challenges.map((challenge, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: challenge.info?.[DEFAULT_LOCALE]?.title ?? challenge.path,
      url: absoluteUrl(`/challenges/${challenge.path}`),
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    inLanguage: DEFAULT_LOCALE,
  };
}

/**
 * Only facts from the challenge's info.yml are used: title, difficulty, type, tags, author, published date.
 */
export function challengeJsonLd(challenge: Pick<ChallengeSlim, "path" | "info" | "type" | "difficulty">) {
  const info = challenge.info?.[DEFAULT_LOCALE];
  const title = info?.title ?? challenge.path;
  const url = absoluteUrl(`/challenges/${challenge.path}`);
  const tags = (info?.tags ?? []).filter(Boolean);
  const datePublished = toIsoDate(info?.published_date);
  const author = info?.author?.name
    ? {
        "@type": "Person",
        name: info.author.name,
        ...(info.author.github ? { url: `https://github.com/${info.author.github}` } : {}),
      }
    : undefined;

  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": "LearningResource",
        name: title,
        description: describeChallenge(challenge),
        url,
        mainEntityOfPage: url,
        learningResourceType: TYPE_LABEL[challenge.type] ?? "challenge",
        educationalLevel: challenge.difficulty,
        ...(tags.length ? { keywords: tags.join(", ") } : {}),
        ...(author ? { author } : {}),
        ...(datePublished ? { datePublished } : {}),
        inLanguage: DEFAULT_LOCALE,
        isAccessibleForFree: true,
        isPartOf: websiteRef(),
      },
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Challenges", path: "/challenges" },
        { name: title, path: `/challenges/${challenge.path}` },
      ]),
    ],
  };
}

type CollectionInput = {
  name: string;
  description: string;
  path: string;
  challenges: ChallengeSlim[];
  breadcrumbs: Crumb[];
};

function collectionJsonLd(input: CollectionInput) {
  const { name, description, path, challenges, breadcrumbs } = input;

  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": "CollectionPage",
        name,
        description,
        url: absoluteUrl(path),
        inLanguage: DEFAULT_LOCALE,
        isPartOf: websiteRef(),
        mainEntity: itemList(challenges),
      },
      breadcrumbList(breadcrumbs),
    ],
  };
}

export function roadmapJsonLd(input: {
  title: string;
  description: string;
  path: string;
  challenges: ChallengeSlim[];
}) {
  const { title, description, path, challenges } = input;

  return collectionJsonLd({
    name: `${title} Roadmap`,
    description,
    path,
    challenges,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Roadmaps", path: "/roadmaps" },
      { name: title, path },
    ],
  });
}

export function categoryJsonLd(input: {
  category: Category;
  title: string;
  description: string;
  challenges: ChallengeSlim[];
}) {
  const { category, title, description, challenges } = input;
  const path = `/categories/${category}`;

  return collectionJsonLd({
    name: `${title} Challenges`,
    description,
    path,
    challenges,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: `${title} Challenges`, path },
    ],
  });
}

export function blogPostJsonLd(input: { title: string; description: string; path: string; publishedAt?: string }) {
  const { title, description, path, publishedAt } = input;
  const url = absoluteUrl(path);
  const datePublished = toIsoDate(publishedAt);

  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: title,
        description,
        url,
        mainEntityOfPage: url,
        ...(datePublished ? { datePublished } : {}),
        inLanguage: DEFAULT_LOCALE,
        isPartOf: websiteRef(),
      },
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: title, path },
      ]),
    ],
  };
}
