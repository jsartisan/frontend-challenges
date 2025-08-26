export type Blog = {
  title: string;
  path: string;
  slug: string;
  excerpt: string;
  published_at: string;
  tags: string[];
  code: string;
  emoji: string;
};

/**
 * Props for blog list components
 */
export interface BlogListProps {
  blogs: Blog[];
}

/**
 * Props for blog detail components
 */
export interface BlogDetailProps {
  blog: Blog;
}
