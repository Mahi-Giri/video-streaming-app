import React, { useRef, useState } from "react";

const Sections = () => {
  const sliderRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  const scrollStep = 200; // Adjust based on card width + gap

  const handlePrev = () => {
    if (sliderRef.current) {
      const newScrollAmount = Math.max(scrollAmount - scrollStep, 0);
      setScrollAmount(newScrollAmount);
      sliderRef.current.style.transform = `translateX(-${newScrollAmount}px)`;
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      const maxScroll =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      const newScrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
      setScrollAmount(newScrollAmount);
      sliderRef.current.style.transform = `translateX(-${newScrollAmount}px)`;
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Title */}
      <h2 className="text-white text-xl font-bold mb-4">Trending Now</h2>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex gap-4 transition-transform duration-300"
      >
        {/* Movie Cards */}
        <img
          src="src/images/Rectangle 1.jpeg"
          alt="Movie 1"
          className="w-48 h-72 rounded-lg object-cover"
        />
        <img
          src="src/images/Rectangle 2.jpeg"
          alt="Movie 2"
          className="w-48 h-72 rounded-lg object-cover"
        />
        <img
          src="src/images/Rectangle 3.jpeg"
          alt="Movie 3"
          className="w-48 h-72 rounded-lg object-cover"
        />
        <img
          src="src/images/Rectangle 4.jpeg"
          alt="Movie 4"
          className="w-48 h-72 rounded-lg object-cover"
        />
        <img
          src="src/images/Rectangle 5.jpeg"
          alt="Movie 5"
          className="w-48 h-72 rounded-lg object-cover"
        />
        <img
          src="src/images/Rectangle 6.jpeg"
          alt="Movie 6"
          className="w-48 h-72 rounded-lg object-cover"
        />
        <img
          src="src/images/Rectangle 7.png"
          alt="Movie 7"
          className="w-48 h-72 rounded-lg object-cover"
        />
        <img
          src="src/images/Rectangle 8.png"
          alt="Movie 8"
          className="w-48 h-72 rounded-lg object-cover"
        />
        <img
          src="src/images/Rectangle 9.png"
          alt="Movie 8"
          className="w-48 h-72 rounded-lg object-cover"
        /><img
          src="src/images/Rectangle 10.png"
          alt="Movie 8"
          className="w-48 h-72 rounded-lg object-cover"
        />
      </div>

      {/* Left Button */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-3 rounded-full hover:bg-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Button */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-3 rounded-full hover:bg-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Sections;

