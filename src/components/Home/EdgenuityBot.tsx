import { useEffect } from "react";
import { gsap } from "gsap";
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
const EdgenuityBot = () => {
  useEffect(() => {
    const cards = gsap.utils.toArray(".feature-wrapper");

    cards.forEach((card: any, index) => {
      gsap.fromTo(
        card,
        {
          x: index % 3 === 0 ? -300 : 300,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "botton 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      cards.forEach((card: any) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

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
      description:
        "The first (and possibly only) bot to support EdgeEx classes.",
    },
  ];

  return (
    <Element id="#smooth-wrapper" name="Feature" className="mt-28 font-montserrat">
      <Title
        title="ExoBot - Features"
        subtitle="We know that you're probably interested in all the features that Nexus has to offer to help "
      />
      <div id="#smooth-content" className="mt-16 flex justify-center items-center ">
        <div className="max-w-6xl w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.slice(0, 8).map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="feature-wrapper border-[1px] border-[#45444d] rounded-[8px] text-white p-4 transition-all duration-300"
              >
                <div className="feature-content flex flex-col bg-[#212020] items-center gap-[var(--spacing-card)] transition">
                  <IconComponent className="w-9 h-9 text-gray-500" />
                  <h3 className="text-xl font-semibold text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm text-center">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Element>
  );
};

export default EdgenuityBot;
