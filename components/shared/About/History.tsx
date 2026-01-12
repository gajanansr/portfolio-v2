import { HistoryProps } from "@/types/types";

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
              {section}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default History;
