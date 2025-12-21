"use client";

import { Card, CardHeader } from "@/components/ui/card";
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
    <Card className="mt-8 p-6 max-sm:p-3 text-center">
      <CardHeader className="text-xl pb-8 font-bold">Skills</CardHeader>
      <LazyMotion features={domAnimation}>
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="inline-flex flex-wrap justify-center gap-x-7"
        >
          {skills.map((skill, index) => (
            <m.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="p-4 flex flex-col items-center cursor-pointer"
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                width={50}
                height={50}
                className="pb-2 size-50"
              />
              <p>{skill.name}</p>
            </m.div>
          ))}
        </m.div>
      </LazyMotion>
    </Card>
  );
};

export default Skills;
