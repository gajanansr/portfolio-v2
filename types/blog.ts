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
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}
