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
  Unlock,
  Copy,
  Gamepad2,
} from "lucide-react";
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
  {
    icon: Unlock,
    title: "Frame Unlocker",
    description: "Allows you to access any frame in an instructional activity.",
  },
  {
    icon: Copy,
    title: "Duplicate Tabs",
    description:
      "Exploit that allows you to do multiple classes on different tabs at once.",
  },
  {
    icon: Gamepad2,
    title: "Discord Logging",
    description: "Stay updated with activity logs on Discord.",
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
      className="bg-[#212020] text-white p-6 flex flex-col items-start space-y-3 hover:bg-gray-800 transition"
    >
      <Icon className="w-8 h-8 text-blue-400" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

const EdgenuityBot = () => {
  return (
    <div>
      <Title
        title="Edgenuity Bot - Features"
        subtitle="We know that you're probably interested in all the features that Nexus has to offer to help you complete your Edgenuity classes, so we listed them out for you."
      />
      <div className="min-h-screen bg-[#212020] flex justify-center items-center">
        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
          {features.slice(0, 8).map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
          <div className="col-span-4 grid grid-cols-3 ">
            {features.slice(8).map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgenuityBot;
