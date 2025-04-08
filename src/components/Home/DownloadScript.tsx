import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Title from "./Shared/Title";

const DownloadScript = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/exodues-bot-v3.js";
    link.download = "exodues-bot-v3.js";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);

    /* Reset button after a short */
    setTimeout(() => {
      setDownloaded(false);
    }, 4000);
  };

  return (
    <div className="bg-[#181818] pt-24 font-montserrat">
      <Title title="Download Install...  " subtitle="" />
      <div className="flex flex-col items-center justify-center">
        <a
          href="https://www.tampermonkey.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-hovertext)] underline"
        >
          <motion.div
            className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-blue-500"
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.3 },
            }}
            style={{
              boxShadow: "0 0 30px rgba(135, 206, 235, 0.5)",
            }}
          >
            <img
              src="https://i.postimg.cc/zfCvqNvy/exoduspro.png"
              alt="Profile picture"
              className="object-cover p-1"
            />
          </motion.div>
        </a>

        {/* Download Button */}
        <Button
          className={`text-2xl px-10 mt-5 mb-5 py-6 rounded shadow-lg transition-all ${
            downloaded
              ? "bg-green-500 text-white"
              : "bg-[var(--color-hovertext)] text-white hover:bg-[#544ab5]"
          }`}
          onClick={handleDownload}
          disabled={downloaded}
        >
          {downloaded ? (
            <div className="flex items-center justify-center space-x-2">
              <FaCheck size={24} />
              <span>Download Complete</span>
            </div>
          ) : (
            "Download Script"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DownloadScript;
