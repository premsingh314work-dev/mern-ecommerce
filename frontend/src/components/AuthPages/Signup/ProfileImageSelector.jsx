import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";



function ProfileImageSelector({ProfileImageData}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = ProfileImageData;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + images.length) % images.length
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Title */}
      <h2 className="text-lg font-semibold">Profile Image</h2>

      {/* Image Selector */}
      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={prevImage}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <ChevronLeft />
        </button>

        {/* Circular Image */}
        <div className="h-40 w-40 rounded-full overflow-hidden border-2 border-amber-500">
          <img
            src={images[currentIndex]}
            alt="Profile"
            className="h-40 w-40 object-cover text-center"
          />
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={nextImage}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Optional indicator */}
      <p className="text-sm text-gray-500">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
}

export default ProfileImageSelector;
