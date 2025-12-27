import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import BlogList from "@/components/shared/Blog/BlogList";
import NewsletterForm from "@/components/shared/Newsletter/NewsletterForm";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts, tutorials, and insights on web development, design, and technology.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allCategories = getAllCategories();

  return (
    <>
      <div className="content-z-index min-h-screen pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-text mb-4">Blog</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development, design, and
            technology.
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
        <div className="mt-20">
          <NewsletterForm />
        </div>
      </div>
    </>
  );
}
