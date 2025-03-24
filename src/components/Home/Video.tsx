import { useState } from "react";
import photo from "../../assets/photo1.jpg";
import { X } from "lucide-react";

const Video = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mt-20">
      {/* Video Thumbnail */}
      <div className="relative flex justify-center">
        <div className="relative min-w-[50%]  mx-auto">
          <img
            src={photo}
            alt="Course Thumbnail"
            className="rounded-2xl border border-gray-500  border-solid"
          />
          {/* Play Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute cursor-pointer inset-0 flex justify-center items-center bg-black/40 rounded-2xl hover:bg-black/50 transition-opacity duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-12 h-12 sm:w-16 sm:h-16 hover:scale-110 transition-transform duration-300"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

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
              onClick={() => setIsModalOpen(false)}
              className="absolute cursor-pointer top-1 right-1 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-300 transition"
            >
              <X  />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
