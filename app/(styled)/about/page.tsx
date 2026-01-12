import { Metadata } from "next";
import { about, skills, timeline, history } from "@/constants/about";
import Introduction from "@/components/shared/About/Introduction";
import Skills from "@/components/shared/About/Skills";
import Experiences from "@/components/shared/About/Experiences";
import History from "@/components/shared/About/History";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about me, my skills, and experience.",
};

const About = () => {
  return (
    <div className="py-12 md:py-20 px-6">
      <Introduction about={about} />
      <div className="my-20">
        <History history={history} />
      </div>
      <div className="my-20">
        <Skills skills={skills} />
      </div>
      <div className="my-20 max-w-3xl mx-auto">
        <Experiences timeline={timeline} />
      </div>

      {/* CTA Section */}
      <section className="mt-32 pt-8 flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-bold mb-4">Let&apos;s Connect</h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          Open to new opportunities and collaborations.
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <Link href="/resume.pdf" target="_blank">
            <Button className="h-12 px-8 text-base bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all hover:scale-105">
              Download Resume
            </Button>
          </Link>
          <Link href={`mailto:${siteConfig.email}`}>
            <Button variant="outline" className="h-12 px-8 text-base rounded-full hover:scale-105 transition-all">
              Email Me
            </Button>
          </Link>
        </div>

      </section>
    </div>
  );
};

export default About;

