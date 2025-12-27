"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

const AnimatedCard = ({
  children,
  index = 0,
  className = "",
}: AnimatedCardProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          y: -5,
          transition: { duration: 0.2 },
        }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

export default AnimatedCard;
