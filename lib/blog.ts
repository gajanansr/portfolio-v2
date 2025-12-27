import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BlogPost, BlogPostMeta } from "@/types/blog";

const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIRECTORY)) {
        return [];
    }

    const files = fs.readdirSync(BLOG_DIRECTORY);
    return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
    const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        author: data.author || { name: "Gajanan" },
        coverImage: data.coverImage || null,
        category: data.category || "general",
        keywords: data.keywords || [],
        published: data.published !== false,
        content,
        readingTime: stats,
    };
}

/**
 * Get all blog posts metadata (for listing pages)
 */
export function getAllPosts(): BlogPostMeta[] {
    const slugs = getAllPostSlugs();

    const posts = slugs
        .map((slug) => {
            const post = getPostBySlug(slug);
            if (!post) return null;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { content, ...meta } = post;
            return meta;
        })
        .filter((post): post is BlogPostMeta => post !== null && post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

/**
 * Get all unique categories from published posts
 */
export function getAllCategories(): string[] {
    const posts = getAllPosts();
    const categoriesSet = new Set<string>();

    posts.forEach((post) => {
        if (post.category) {
            categoriesSet.add(post.category.toLowerCase());
        }
    });

    return Array.from(categoriesSet).sort();
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPostMeta[] {
    const posts = getAllPosts();
    return posts.filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
    );
}

// Re-export formatDate from client-safe module
export { formatDate } from "./blog-utils";
