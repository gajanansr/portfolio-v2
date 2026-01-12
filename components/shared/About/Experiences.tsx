import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimelineDate from "../Timeline/TimelineDate";
import TimelineContainer from "../Timeline/TimelineContainer";
import { ExperiencesProps } from "@/types/types";

const Experiences = ({ timeline }: ExperiencesProps) => {
  return (
    <section className="mt-16">
      <div className="mb-10 text-center space-y-2">
        <h2 className="text-3xl font-bold">Experiences</h2>
        <p className="text-neutral-500 dark:text-neutral-400">My professional journey and education.</p>
      </div>

      <div className="space-y-8 relative">
        <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-neutral-200 dark:bg-neutral-800" />

        {timeline.map((project, index) => (
          <div key={index} className="relative z-10">
            <TimelineDate date={project.year} />
            <div className="space-y-4 mt-4">
              {project.events.map((event, index) => (
                <TimelineContainer
                  key={index}
                  title={event.title}
                  subTitle={event.subTitle}
                  type={event.type}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
