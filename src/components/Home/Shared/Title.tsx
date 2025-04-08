import CommonWrapper from "@/wrapper/CommonWrapper";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type TitleProps = {
  title: string;
  subtitle?: string;
};
const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  const ref = useRef<HTMLDivElement>(null);
  const PInView = useInView(ref, { once: true, margin: "100px" });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <CommonWrapper>
      <div className="  space-y-5 w-[80%] mx-auto text-center font-montserrat">
        <motion.h1
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="text-[var(--color-textcolor)] text-3xl sm:text-4xl text-center "
        >
          {title}
        </motion.h1>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={PInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className=" w-5/6 sm:w-2/3  text-center text-xs sm:text-[16px] mx-auto text-[var(--color-textsecondarycolor)]"
        >
          {subtitle}
        </motion.p>
      </div>
    </CommonWrapper>
  );
};

export default Title;
