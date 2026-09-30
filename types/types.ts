export type Languages = {
  name: string;
};

export type Project = {
  title: string;
  description: string;
  projectUrl?: string;
  gitHubUrl?: string;
  year: string;
  stack: string[];
};

export type FeaturedProject = Project & {
  tagline: string;
  highlights: string[];
  image?: string;
  note?: string;
};

export type Tools = {
  logo: string;
  title: string;
  description: string;
  link: string;
};

export type TimelineContainerProps = {
  title: string;
  subTitle: string;
  type?: string;
};

export type ChildrenProps = {
  children: React.ReactNode;
};

export type IntroductionProps = {
  about: {
    heading: string;
    professionalInfo: string;
    casualLife: string;
  };
};

export type HistoryProps = {
  history: {
    heading: string;
    sections: string[];
  };
};

export type SkillsProps = {
  skills: {
    category: string;
    items: string[];
  }[];
};

export type ExperiencesProps = {
  timeline: {
    year: number;
    events: TimelineContainerProps[];
  }[];
};

export type IconProps = {
  width?: string;
  height?: string;
  className?: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  author: string;
  url: string;
  ogImage: string;
  email: string;
  location: string;
  keywords: string[];
  links: {
    github: string;
    linkedin: string;
    twitter: string;
    /** Publication home, e.g. https://gajanan.substack.com. Empty until it exists. */
    substack?: string;
  };
};
