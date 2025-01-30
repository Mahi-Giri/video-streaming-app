import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [carouselData, setCarouselData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Fetch data from the API
  useEffect(() => {
    const API_KEY = "48515426-3de9de4299eadbd760d5f0c0c";
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/videos/?key=${import.meta.env.VITE_API_KEY}&q=football&pretty=true`
        );
        const data = await response.json();
        if (data.hits) {
          setCarouselData(
            data.hits.map((video) => ({
              image: video.videos.tiny.url, // Use the tiny video URL as the thumbnail
              title: video.tags,
              part: "PART 1",
              imdb: "IMDb 7.0/10",
              streams: "1B+ Streams",
              playSrc: video.videos.medium.url, // Use the medium video URL for playback
              trailerSrc: video.videos.medium.url, // Use the medium video URL for the trailer
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (carouselData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [carouselData.length]);

  const currentSlide = carouselData[currentIndex];

  const handleNavigation = (type) => {
    const videoSrc = type === "play" ? currentSlide.playSrc : currentSlide.trailerSrc;
    navigate("/videoplayer", { state: { videoSrc, type, title: currentSlide.title } });
  };

  if (!carouselData.length) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden text-white bg-black">
      <div
        className="w-full h-full transition-all duration-500 bg-right bg-cover"
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      >
        <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full px-8 bg-gradient-to-b from-black/30 to-black/90">
          <h1 className="mb-4 text-5xl font-bold text-red-600">NETFLIX</h1>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">{currentSlide.title}</span>
          </div>
          <p className="mt-2 text-xl text-gray-400">{currentSlide.part}</p>
          <div className="mt-4 space-y-2 text-lg">
            <p>{currentSlide.imdb}</p>
            <p>{currentSlide.streams}</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              className="px-6 py-2 font-bold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => handleNavigation("play")}
            >
              ▶ Play
            </button>
            <button
              className="px-6 py-2 font-bold text-white transition border-2 border-white rounded-lg hover:bg-white hover:text-black"
              onClick={() => handleNavigation("trailer")}
            >
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
