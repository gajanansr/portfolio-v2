"use client";

import Link from "next/link";
import { BlogPostMeta } from "@/types/blog";
import { formatDate } from "@/lib/blog-utils";
import { LazyMotion, domAnimation, m } from "framer-motion";

interface BlogCardProps {
    post: BlogPostMeta;
    index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
    return (
        <LazyMotion features={domAnimation}>
            <m.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
            >
                <Link href={`/blog/${post.slug}`}>
                    <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm card-glow transition-all duration-300 hover:border-purple-500/30">
                        {/* Cover Image */}
                        {post.coverImage && (
                            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        )}

                        {/* Category Badge */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 capitalize">
                                {post.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {post.title}
                        </h2>

                        {/* Description */}
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                            {post.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
                            <div className="flex items-center gap-3">
                                <span>{formatDate(post.date)}</span>
                                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                                <span>{post.readingTime.text}</span>
                            </div>

                            {/* Read more arrow */}
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1">
                                Read
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </Link>
            </m.article>
        </LazyMotion>
    );
}
