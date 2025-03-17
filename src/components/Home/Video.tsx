import { useState } from "react";
import video from "../../assets/video.png";

const Video = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="relative h-auto flex justify-center mb-10">
        <div className="relative">
          <img
            src={video}
            alt="Course Thumbnail"
            className="lg:max-w-[1320px] lg:max-h-[559px] object-cover border-4 border-solid border-gray-300 rounded-2xl"
          />

          <button
            onClick={handleOpenModal}
            className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              className="hover:scale-110 transition-transform duration-300"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl border-4 border-solid border-gray-300 overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/iwefAEFeEbw?autoplay=1"
              title="YouTube Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded-2xl"
            ></iframe>

            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-white text-black font-bold rounded-full px-2 py-2 hover:bg-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
