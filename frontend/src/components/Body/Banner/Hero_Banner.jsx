import { useState, useEffect } from "react";
import { Banner_images } from "./Banner.data.js";

function Hero_Banner() {

  const [BannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    let interval = null;

    const stopSlider = () => {
      if (interval) clearInterval(interval);
    };

    const startSlider = () => {
      stopSlider();
      interval = setInterval(() => {
        setBannerIndex((prev) => (prev + 1) % Banner_images.length);
      }, 10000);
    };

    const handleVisibilityChange = () => {
      document.hidden ? stopSlider() : startSlider();
    };

    startSlider();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopSlider();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [Banner_images.length]);

  return (
    <div className="w-full overflow-hidden
      h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out "
        style={{ transform: `translateX(-${BannerIndex * 100}%)` }}
      >
        {Banner_images.map((banner_url, index) => (
          <img
            key={index}
            src={banner_url}
            alt="banner_image"
            className="
              block w-full h-full object-cover shrink-0
              scale-[0.95] md:scale-100
            "
          />
        ))}
      </div>
    </div>
  )
}

export default Hero_Banner
