import { Caveat } from "next/font/google";
import { HistoryProps } from "@/types/types";

const handwriting = Caveat({ subsets: ["latin"], weight: "600" });

// Hand-drawn note with an arrow curling down to the word it sits above.
const Scribble = ({ text }: { text: string }) => (
  <span
    aria-hidden
    className={`${handwriting.className} pointer-events-none absolute bottom-full left-full -ml-3 flex -rotate-3 select-none flex-col items-start whitespace-nowrap text-2xl leading-none text-neutral-500 dark:text-neutral-400`}
  >
    {text}
    <svg
      viewBox="0 0 40 34"
      className="-mt-0.5 ml-1 h-8 w-10 flex-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M34 3 C 32 16, 20 26, 6 29" />
      <path d="M14 22 L5.5 29.5 L15 32" />
    </svg>
  </span>
);

// Renders [text](url) markers in a section as links.
const renderWithLinks = (text: string) =>
  text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)|\s]+)(?:\|([^)]+))?\)$/);
    if (!match) return part;
    const link = (
      <a
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 text-neutral-900 dark:text-neutral-100 hover:text-neutral-500 dark:hover:text-neutral-400"
      >
        {match[1]}
      </a>
    );
    if (!match[3]) return <span key={i}>{link}</span>;
    return (
      <span key={i} className="relative inline-block">
        {link}
        <Scribble text={match[3]} />
      </span>
    );
  });

const History = ({ history }: HistoryProps) => {
  const { heading, sections } = history;

  return (
    <section className="mt-12 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="relative pl-6 border-l-2 border-neutral-200 dark:border-neutral-800"
          >
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {renderWithLinks(section)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default History;
