"use client";

import { ProjectCard } from "./ProjectCard";
import { projectList } from "@/constants/projectList";
import AnimatedCard from "../AnimatedCard";

const Projects = () => {
  return (
    <>
      <h1 id="projects" className="mt-6 heading-text mb-3 text-center">
        Projects
      </h1>
      <p className="mb-16 text-center">
        Explore some of the projects I worked on in the past.
      </p>
      <div className="w-full columns-1 gap-6 md:columns-2">
        {projectList.map((project, index) => (
          <AnimatedCard key={index} index={index}>
            <ProjectCard
              logo={project.logo}
              title={project.title}
              description={project.description}
              projectUrl={project.projectUrl}
              gitHubUrl={project.gitHubUrl}
              year={project.year}
              languages={project.languages}
            />
          </AnimatedCard>
        ))}
      </div>
    </>
  );
};

export default Projects;
