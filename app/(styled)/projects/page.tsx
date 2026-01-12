import { Metadata } from "next";
import Projects from "@/components/shared/Project/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore some of the projects I worked on in the past.",
};

const ProjectsPage = () => {
  return (
    <div className="py-12 md:py-20">
      <Projects />
    </div>
  );
};

export default ProjectsPage;
