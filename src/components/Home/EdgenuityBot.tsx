import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LucideIcon,
  CheckCircle,
  Pen,
  PlayCircle,
  ClipboardList,
  FileText,
  Grid,
  Gamepad2,
} from "lucide-react";

import { Element } from "react-scroll";
import Title from "./Shared/Title";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: FeatureCardProps[] = [
  {
    icon: CheckCircle,
    title: "Auto Advance",
    description:
      "Automatically progress to the next activity or question with customizable delays.",
  },
  {
    icon: ClipboardList,
    title: "Auto Submit",
    description:
      "Automatically submit activities with customizable delays for each activity.",
  },
  {
    icon: FileText,
    title: "Auto Assessment",
    description:
      "Answer quizzes, tests, and exams autonomously and accurately. Includes options to customize the grade wanted in the assessment.",
  },
  {
    icon: PlayCircle,
    title: "Video Skipper",
    description: "Skips videos for you with full credit. (EdgeEx only)",
  },
  {
    icon: Pen,
    title: "Auto Write",
    description:
      "Submit high-quality responses to short writings, journals, and essays with our custom AI model + humanizer.",
  },
  {
    icon: Grid,
    title: "Auto Assignment, Ungraded, Vocabulary",
    description:
      "Self-explanatory, it'll automatically complete all of these for you :)",
  },
  {
    icon: Gamepad2,
    title: "Interactive Skips",
    description:
      "Bypass math graphs, geometry proofs, virtual labs, and foreign language games instantly with full credit.",
  },
  {
    icon: Grid,
    title: "EdgeEx Support",
    description: "The first (and possibly only) bot to support EdgeEx classes.",
  },
];

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="feature-card bg-[#212020] text-white p-6 flex flex-col items-start space-y-3 transition           
              md:[&:nth-child(5)]:border-transparent
                md:border-l-[1px] md:first:border-transparent border-green-900/30
                border-b-2 md:border-b-0 rounded-b-2xl md:rounded-b-none
                "
    >
      <Icon className="w-6 h-6 text-gray-500" />
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

const EdgenuityBot = () => {
  return (
    <Element name="Feature" className="mt-28 font-montserrat">
      <Title
        title="Edgenuity Bot - Features"
        subtitle="We know that you're probably interested in all the features that Nexus has to offer to help "
      />
      <div className=" mt-16 bg-[#212020] flex justify-center items-center">
        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.slice(0, 8).map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {features.slice(8).map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </Element>
  );
};

export default EdgenuityBot;
