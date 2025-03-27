import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const Video = ({
  isModalOpen,
  setModalOpen,
}: {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="mt-20">
      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-lg z-50">
          {/* Video Container */}
          <div className="relative w-[90%] max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/iwefAEFeEbw?autoplay=1"
              title="YouTube Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded-2xl"
            />
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(!isModalOpen)}
              className="absolute cursor-pointer top-1 right-1 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-300 transition"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
