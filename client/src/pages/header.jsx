import { useState, useEffect } from "react";

function Header() {
  const carouselData = [
    {
      image: "/src/images/Ant-Man.jpg",
      title: "ANT-MAN",
      part: "PART 3",
      imdb: "IMDb 7.0/10",
      streams: "1B+ Streams",
    },
    {
      image: "/src/images/dark_knight.jpg",
      title: "THE DARK KNIGHT",
      part: "PART 2",
      imdb: "IMDb 9.0/10",
      streams: "3B+ Streams",
    },
    {
      image: "/src/images/Solo_Leveling.png",
      title: "SOLO LEVELING",
      part: "SEASON 1",
      imdb: "IMDb 8.5/10",
      streams: "500M+ Streams",
    },
    {
      image: "/src/images/WANDAVISION.jpg",
      title: "WANDA VISION",
      part: "SEASON 1",
      imdb: "IMDb 8.0/10",
      streams: "2B+ Streams",
    },
    {
      image: "/src/images/wicked.jpeg",
      title: "WICKED",
      part: "PART 4",
      imdb: "IMDb 8.8/10",
      streams: "2B+ Streams",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselData.length]);

  const currentSlide = carouselData[currentIndex];

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black text-white">
      <div className="h-full w-full bg-cover bg-right transition-all duration-500"
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/90 flex flex-col justify-center px-8">
          <h1 className="text-5xl font-bold text-red-600 mb-4">NETFLIX</h1>
          <div className="flex gap-2 items-center">
            <span className="text-4xl font-bold">{currentSlide.title}</span>
          </div>
          <p className="text-xl text-gray-400 mt-2">{currentSlide.part}</p>
          <div className="mt-4 text-lg space-y-2">
            <p>{currentSlide.imdb}</p>
            <p>{currentSlide.streams}</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition">
              ▶ Play
            </button>
            <button className="px-6 py-2 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-black transition">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
