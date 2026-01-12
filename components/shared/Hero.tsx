"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

const Hero = () => {
  const text = "hi, I'm gajanan";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <div className="text-center content-z-index h-dvh flex flex-col justify-center items-center relative">
      <LazyMotion features={domAnimation}>
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-3 gap-y-4 max-w-4xl px-4"
        >
          {text.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="whitespace-nowrap inline-block">
              {word.split("").map((char, charIndex) => (
                <m.span
                  key={`${wordIndex}-${charIndex}`}
                  variants={letterVariants}
                  whileHover={{
                    y: -15,
                    rotate: charIndex % 2 === 0 ? 10 : -10,
                    scale: 1.2,
                    color: "#9333ea",
                    transition: { duration: 0.2 },
                  }}
                  className="text-7xl md:text-9xl font-black tracking-tighter cursor-default inline-block select-none transition-colors duration-200"
                >
                  {char}
                </m.span>
              ))}
            </span>
          ))}
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 text-xl text-neutral-500 dark:text-neutral-400 font-medium"
        >
          Software Engineer & Creative Developer
        </m.p>
      </LazyMotion>
    </div>
  );
};

export default Hero;

