"use client";

const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Dashed Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dashed-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal dashed line */}
            <line
              x1="0"
              y1="40"
              x2="40"
              y2="40"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="text-neutral-300 dark:text-neutral-600"
            />
            {/* Vertical dashed line */}
            <line
              x1="40"
              y1="0"
              x2="40"
              y2="40"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="text-neutral-300 dark:text-neutral-600"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dashed-grid)" />
      </svg>

      {/* Radial fade mask - subtle fade at edges only */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 50% 50%, transparent 0%, var(--bg-color) 100%)`,
        }}
      />

      {/* Subtle edge fading */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 dark:from-black via-transparent to-neutral-50 dark:to-black opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 dark:from-black via-transparent to-neutral-50 dark:to-black opacity-20" />
    </div>
  );
};

export default GridBackground;
