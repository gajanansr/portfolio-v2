import { IntroductionProps } from "@/types/types";

const Introduction = ({ about }: IntroductionProps) => {
  const { professionalInfo, casualLife } = about;

  return (
    <section className="py-8 max-w-3xl mx-auto space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Hi, I&apos;m <span className="text-purple-600 dark:text-purple-400">Gajanan Rathod</span> <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
        </h1>
        <div className="space-y-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <p>{professionalInfo}</p>
          <p>{casualLife}</p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
