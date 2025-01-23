import { useState, useEffect } from "react";
import "./header.css";

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
    <div className="netflix-header">
      <div
        className="carousel-slide"
        style={{
          backgroundImage: `url(${currentSlide.image})`,
        }}
      >
        <div className="content-overlay">
          <div className="title-section">
            <h1 className="netflix-logo">NETFLIX</h1>
            <div className="title">
              <span className="series-title">{currentSlide.title}</span>
              <span className="series-highlight">{currentSlide.highlight}</span>
            </div>
            <p className="part-number">{currentSlide.part}</p>
          </div>
          <div className="ratings">
            <p className="imdb-rating">{currentSlide.imdb}</p>
            <p className="streams">{currentSlide.streams}</p>
          </div>
          <div className="buttons">
            <button className="play-btn">▶ Play</button>
            <button className="trailer-btn">Watch Trailer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
