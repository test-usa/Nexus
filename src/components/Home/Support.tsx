import { FaDiscord } from "react-icons/fa";
import Title from "./Shared/Title";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion } from "framer-motion";
const Support = () => {
  return (
    <section className="py-16 bg-[#3F3854] relative z-30 font-montserrat  mt-16">
      <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
        <Title
          title="Join our Discord for 24/7 support!"
          subtitle="no worries, go to our install guide by clicking the button below, and understand how to install our cutting-Edge(nuity) userscript."
        />
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
          <a
            href="https://discord.com/invite/exodusbot"
            className="px-8 py-3 text-[16px] flex items-center gap-x-2 rounded text-[var(--color-textcolor)]  ransform transition-all duration-300 
              bg-gradient-to-r from-[#5c3991] z-10 to-[#3a2b49] cursor-pointer"
          >
            <FaDiscord className="text-2xl text-blue-500" />
            <p>Discord</p>
          </a>
        </div>
      </div>
      <motion.div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={100} count={500} factor={2} fade speed={3} />
        </Canvas>
      </motion.div>
    </section>
  );
};

export default Support;
