// Blog-related type definitions

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: {
    name: string;
    image?: string;
  };
  coverImage?: string;
  category: string;
  keywords: string[];
  published: boolean;
  /** Set once the post lives on Substack/Medium; the site then links out and redirects. */
  externalUrl?: string;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: {
    name: string;
    image?: string;
  };
  coverImage?: string;
  category: string;
  keywords: string[];
  published: boolean;
  /** Set once the post lives on Substack/Medium; the site then links out and redirects. */
  externalUrl?: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}
