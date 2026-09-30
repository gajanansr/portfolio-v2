import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import BlogList from "@/components/shared/Blog/BlogList";
import { siteConfig } from "@/config/site";
import NewsletterForm from "@/components/shared/Newsletter/NewsletterForm";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Backend engineering, databases and system design, explained from things I've broken in production.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allCategories = getAllCategories();

  return (
    <div className="py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="mt-6 heading-text mb-4">Writing</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Backend engineering, databases and system design, explained from
          things I&apos;ve broken.
        </p>
      </div>

      {/* Blog List */}
      {posts.length > 0 ? (
        <BlogList posts={posts} allCategories={allCategories} />
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
            Coming Soon
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            I&apos;m working on some exciting content. Subscribe below to get
            notified!
          </p>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="mt-12">
        {siteConfig.links.substack ? (
          <div className="text-center">
            <a
              href={siteConfig.links.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-neutral-900 dark:bg-neutral-100 px-7 py-3 text-sm font-medium text-white dark:text-neutral-900 transition-transform hover:scale-105 hover:bg-neutral-700 dark:hover:bg-neutral-300"
            >
              Subscribe on Substack
            </a>
          </div>
        ) : (
          <NewsletterForm />
        )}
      </div>
    </div>
  );
}
