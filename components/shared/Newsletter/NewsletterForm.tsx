"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Welcome aboard! 🎉",
          description: "You've successfully subscribed to the newsletter.",
        });
        setEmail("");
      } else {
        throw new Error(data.error || "Failed to subscribe");
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description:
          error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[90vw] mx-auto"
      >
        <div className="py-8 mb-12 p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
              Subscribe to my Newsletter
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Get notified when I publish new articles. No spam, unsubscribe
              anytime.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={isLoading}
              className="flex-1 min-w-0 px-3 sm:px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50"
            />
            <m.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex-shrink-0 px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </m.button>
          </form>

          <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center mt-4">
            By subscribing, you agree to receive email updates. Your email will
            never be shared.
          </p>
        </div>
      </m.div>
    </LazyMotion>
  );
}
