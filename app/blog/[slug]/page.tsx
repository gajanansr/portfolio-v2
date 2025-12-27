import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug, formatDate } from "@/lib/blog";
import ReadingProgress from "@/components/shared/Blog/ReadingProgress";
import ShareButtons from "@/components/shared/Blog/ShareButtons";
import NewsletterForm from "@/components/shared/Newsletter/NewsletterForm";
import BlogContent from "@/components/shared/Blog/BlogContent";
import { siteConfig } from "@/config/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${siteConfig.url}/blog/${slug}`;

  return (
    <>
      <ReadingProgress />

      <article className="content-z-index min-h-screen pt-24 px-4 sm:px-6 lg:px-0 max-w-3xl mx-auto overflow-x-hidden">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Category */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 capitalize">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-6">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-4">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {post.author.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <span>{formatDate(post.date)}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-400" />
                    <span>{post.readingTime.text}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <ShareButtons title={post.title} url={postUrl} />
          </div>
        </header>

        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full max-w-full h-auto mb-12 object-cover rounded-xl transition-transform duration-300"
        />

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800">
          <BlogContent content={post.content} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          {/* Share Again */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-24">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
              Enjoyed this article? Share it with others!
            </p>
            <ShareButtons title={post.title} url={postUrl} />
          </div>

          {/* Newsletter */}
          <NewsletterForm />
        </footer>
      </article>
    </>
  );
}
