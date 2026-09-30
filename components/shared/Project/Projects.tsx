"use client";

import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ProjectCard } from "./ProjectCard";
import { featuredProjects, moreProjects } from "@/constants/projectList";
import { siteConfig } from "@/config/site";
import AnimatedCard from "../AnimatedCard";

const Projects = () => {
  return (
    <>
      <h1 id="projects" className="mt-6 heading-text mb-3 text-center">
        Projects
      </h1>
      <p className="mb-16 text-center dim-text">
        The things I&apos;m proudest of, and what I learned building them.
      </p>

      <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <AnimatedCard key={project.title} index={index % 2}>
            <FeaturedProjectCard {...project} />
          </AnimatedCard>
        ))}
      </div>

      <section className="mt-28">
        <h2 className="mb-6 text-2xl font-bold">More</h2>
        <div className="border-b border-neutral-200 dark:border-neutral-800">
          {moreProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
        <p className="mt-6 text-sm dim-text">
          Everything else is on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-neutral-500 dark:hover:text-neutral-400"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </>
  );
};

export default Projects;
