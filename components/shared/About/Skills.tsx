import { SkillsProps } from "@/types/types";

const Skills = ({ skills }: SkillsProps) => {
  return (
    <section className="mt-16 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
      <dl className="border-t border-neutral-200 dark:border-neutral-800">
        {skills.map((group) => (
          <div
            key={group.category}
            className="flex flex-col gap-2 border-b border-neutral-200 py-5 dark:border-neutral-800 sm:flex-row sm:gap-8"
          >
            <dt className="text-sm font-semibold sm:w-48 sm:flex-none">
              {group.category}
            </dt>
            <dd className="flex flex-wrap gap-x-2 gap-y-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Skills;
