import { ArrowTopRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { Project } from "@/types/types";

export function ProjectCard({
  title,
  description,
  projectUrl,
  gitHubUrl,
  year,
  stack,
}: Project) {
  return (
    <div className="flex flex-col gap-2 border-t border-neutral-200 py-5 dark:border-neutral-800 sm:flex-row sm:items-start sm:gap-8">
      <div className="sm:w-1/3">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-xs dim-text">
          {year} · {stack.join(", ")}
        </p>
      </div>
      <p className="flex-1 text-sm dim-text">{description}</p>
      <div className="flex items-center gap-4 text-sm sm:w-24 sm:justify-end">
        {projectUrl ? (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} live site`}
            className="hover:text-neutral-500 dark:hover:text-neutral-400"
          >
            <ArrowTopRightIcon />
          </a>
        ) : null}
        {gitHubUrl ? (
          <a
            href={gitHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} on GitHub`}
            className="hover:text-neutral-500 dark:hover:text-neutral-400"
          >
            <GitHubLogoIcon />
          </a>
        ) : null}
      </div>
    </div>
  );
}
