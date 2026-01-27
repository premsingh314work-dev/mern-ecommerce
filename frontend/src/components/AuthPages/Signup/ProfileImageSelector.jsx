import { ChevronLeft, ChevronRight } from "lucide-react";

function ProfileImageSelector({ ProfileImageData, selectedImage, onImageChange }) {
  // Find index based on the image passed from parent
  const currentIndex = ProfileImageData.indexOf(selectedImage);

  const nextImage = () => {
    const nextIdx = (currentIndex + 1) % ProfileImageData.length;
    onImageChange(ProfileImageData[nextIdx]);
  };

  const prevImage = () => {
    const prevIdx = (currentIndex - 1 + ProfileImageData.length) % ProfileImageData.length;
    onImageChange(ProfileImageData[prevIdx]);
  };

  return (
    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
      <h2 className="text-lg font-semibold">Choose Your Avatar</h2>
      <div className="flex items-center gap-4">
        <button type="button" onClick={prevImage} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <ChevronLeft />
        </button>

        <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-amber-500 shadow-lg">
          <img
            src={selectedImage}
            alt="Profile Preview"
            className="h-full w-full object-cover"
          />
        </div>

        <button type="button" onClick={nextImage} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <ChevronRight />
        </button>
      </div>
      <p className="text-sm text-gray-500">Avatar {currentIndex + 1} of {ProfileImageData.length}</p>
    </div>
  );
}

export default ProfileImageSelector;