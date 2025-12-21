"use client";

import { hero, startDate } from "@/constants/about";
import ScrollDown from "./ScrollDown";
import { calculateTimePassed } from "@/lib/utils";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Typewriter from "./Typewriter";

const roles = [
  "Software Engineer.",
  "Aspiring Founder.",
  "Creative Director.",
  "Song Writer.",
];

const Landing = () => {
  const { heading, content } = hero;
  const years = calculateTimePassed(startDate);
  const [beforeYears, afterYears] = content.split("[[YEARS_OF_EXP]]");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="text-center content-z-index h-dvh flex items-center">
      <LazyMotion features={domAnimation}>
        <m.div
          className="content-z-index relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <m.h1
            variants={headingVariants}
            className="text-black/70 dark:text-white/70 text-9xl max-md:text-6xl font-bold mb-4 hero-text-shine"
          >
            {heading}
          </m.h1>
          <m.h1
            variants={headingVariants}
            className="text-black/70 dark:text-white/70 text-7xl max-md:text-4xl font-bold mb-4 flex justify-center items-center gap-4 max-md:flex-col max-md:gap-1"
          >
            <span className="opacity-60">A</span>
            <Typewriter words={roles} typingSpeed={80} deletingSpeed={40} pauseDuration={1500} />
          </m.h1>
          <m.p
            variants={textVariants}
            className="text-black/70 dark:text-white/70 mt-14 max-md:mt-8 text-3xl max-md:text-xl"
          >
            {beforeYears}
            <m.strong
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="text-gradient"
            >
              {years}
            </m.strong>
            {afterYears}
          </m.p>
          <m.div variants={textVariants}>
            <ScrollDown />
          </m.div>
        </m.div>
      </LazyMotion>
    </div>
  );
};

export default Landing;
