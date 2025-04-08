import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const BlackFireTrail = () => {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 14); 
      mouseY.set(e.clientY - 14);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        translateX: smoothX,
        translateY: smoothY,
      }}
       className="pointer-events-none fixed w-8 h-8 bg-amber-950/30 z-40 rounded-full shadow-[0_0_70px_20px_rgba(147,51,234,0.8)]"
    />
  );
};

export default BlackFireTrail;
