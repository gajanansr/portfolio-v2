"use client";

import { useState, useRef } from "react";

interface CodeBlockProps {
    children: React.ReactNode;
}

export default function CodeBlock({ children }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    const handleCopy = async () => {
        const text = preRef.current?.textContent || "";

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="relative group my-6 w-full overflow-x-auto">
            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className="absolute right-3 top-3 p-1.5 rounded-md bg-neutral-700/50 hover:bg-neutral-600 text-neutral-400 hover:text-neutral-100 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                aria-label="Copy code"
                title={copied ? "Copied!" : "Copy code"}
            >
                {copied ? (
                    <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : (
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                    </svg>
                )}
            </button>

            {/* Code Block */}
            <pre
                ref={preRef}
                className="p-4 rounded-lg bg-neutral-900 text-neutral-100 text-sm font-mono"
            >
                {children}
            </pre>
        </div>
    );
}
