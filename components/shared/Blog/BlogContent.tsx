"use client";

import { useMemo } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useState, useEffect } from "react";
import remarkGfm from "remark-gfm";

interface BlogContentProps {
  content: string;
}

// Custom components for MDX
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="text-3xl font-bold mt-8 mb-4" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="text-2xl font-bold mt-8 mb-4" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="text-xl font-bold mt-6 mb-3" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mb-4 leading-relaxed" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc list-inside mb-4 space-y-2" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="list-decimal list-inside mb-4 space-y-2" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-relaxed" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="border-l-4 border-purple-500 pl-4 italic my-6 text-neutral-600 dark:text-neutral-400"
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code
          {...props}
          className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-purple-600 dark:text-purple-400 text-sm font-mono"
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="overflow-x-auto p-4 rounded-lg bg-neutral-900 text-neutral-100 my-6 text-sm"
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-purple-600 dark:text-purple-400 hover:underline"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    />
  ),
  hr: () => <hr className="my-8 border-neutral-200 dark:border-neutral-800" />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table
        {...props}
        className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800"
      />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="px-4 py-3 text-left text-sm font-semibold bg-neutral-100 dark:bg-neutral-800"
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      className="px-4 py-3 text-sm border-t border-neutral-200 dark:border-neutral-800"
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong
      {...props}
      className="font-bold text-neutral-900 dark:text-neutral-100"
    />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic" />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      {...props}
      className="rounded-xl my-6 w-full max-w-2xl mx-auto"
      loading="lazy"
    />
  ),
};

export default function BlogContent({ content }: BlogContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function serializeContent() {
      try {
        const serialized = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        });
        setMdxSource(serialized);
      } catch (err) {
        console.error("Failed to serialize MDX:", err);
        setError("Failed to render content");
      }
    }
    serializeContent();
  }, [content]);

  // Fallback: render as simple markdown-ish HTML
  const fallbackContent = useMemo(() => {
    if (mdxSource || error) return null;

    // Simple conversion for preview while MDX loads
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("# ")) {
        return (
          <h1 key={i} className="text-3xl font-bold mt-8 mb-4">
            {block.slice(2)}
          </h1>
        );
      }
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
            {block.slice(3)}
          </h2>
        );
      }
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl font-bold mt-6 mb-3">
            {block.slice(4)}
          </h3>
        );
      }
      return (
        <p key={i} className="mb-4 leading-relaxed">
          {block}
        </p>
      );
    });
  }, [content, mdxSource, error]);

  if (error) {
    return (
      <div className="text-red-500">
        {error}. Showing raw content:
        <pre className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-900 rounded overflow-x-auto text-sm">
          {content}
        </pre>
      </div>
    );
  }

  if (!mdxSource) {
    return <div className="animate-pulse">{fallbackContent}</div>;
  }

  return <MDXRemote {...mdxSource} components={components} />;
}
