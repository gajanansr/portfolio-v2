"use client";

import { useState } from "react";
import { BlogPostMeta } from "@/types/blog";
import BlogCard from "./BlogCard";
import { LazyMotion, domAnimation, m } from "framer-motion";

interface BlogListProps {
  posts: BlogPostMeta[];
  allCategories: string[];
}

export default function BlogList({ posts, allCategories }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory
      ? post.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full">
        {/* Search Bar */}
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
        </m.div>

        {/* Category Filter */}
        {allCategories.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${selectedCategory === null
                  ? "bg-purple-600 text-white"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
            >
              All
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 text-sm rounded-full capitalize transition-all duration-200 ${selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
              >
                {category}
              </button>
            ))}
          </m.div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-neutral-500 dark:text-neutral-400"
          >
            <p className="text-lg">No posts found.</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              className="mt-4 text-purple-600 dark:text-purple-400 hover:underline"
            >
              Clear filters
            </button>
          </m.div>
        )}
      </div>
    </LazyMotion>
  );
}
