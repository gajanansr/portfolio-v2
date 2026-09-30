import Image from "next/image";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { FeaturedProject } from "@/types/types";

export function FeaturedProjectCard({
  title,
  tagline,
  description,
  image,
  note,
  projectUrl,
  gitHubUrl,
  year,
  stack,
}: FeaturedProject) {
  const linkClass =
    "inline-flex items-center gap-1 underline-offset-4 hover:underline hover:text-neutral-500 dark:hover:text-neutral-400";

  return (
    <article className="flex h-full flex-col">
      {image ? (
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[2/1] w-full items-end rounded-lg bg-neutral-100 p-5 dark:bg-neutral-900">
          <span className="text-3xl font-semibold tracking-tight text-neutral-400 dark:text-neutral-600">
            {title}
          </span>
        </div>
      )}

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <span className="text-xs dim-text">{year}</span>
        </div>
        <p className="mt-1 text-sm">{tagline}</p>
        <p className="mt-3 text-sm leading-relaxed dim-text">{description}</p>

        <p className="mt-4 text-xs dim-text">{stack.join(" · ")}</p>

        <div className="mt-auto flex items-center gap-5 pt-4 text-sm">
          {projectUrl ? (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Live <ArrowTopRightIcon />
            </a>
          ) : null}
          {gitHubUrl ? (
            <a
              href={gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Code <ArrowTopRightIcon />
            </a>
          ) : null}
          {note ? <span className="text-xs dim-text">{note}</span> : null}
        </div>
      </div>
    </article>
  );
}
