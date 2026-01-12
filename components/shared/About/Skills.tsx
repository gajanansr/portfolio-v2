"use client";

import { SkillsProps } from "@/types/types";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";

const Skills = ({ skills }: SkillsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="mt-16 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
      <LazyMotion features={domAnimation}>
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {skills.map((skill, index) => (
            <m.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {skill.name}
              </p>
            </m.div>
          ))}
        </m.div>
      </LazyMotion>
    </section>
  );
};

export default Skills;
