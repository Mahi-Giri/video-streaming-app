import React, { useRef } from "react";
import { onCLS, onFID, onLCP } from "web-vitals";
import "./Sec1.css";


const Section = () => {
  const carouselRef = useRef(null);

  const movies = [
    { id: 1, title: "Devara", img: "/src/images/Devara.jpg" },
    { id: 2, title: "Lucky bhaskar", img: "/src/images/Lucky Bhaskar.jpg" },
    { id: 3, title: "Xo kutty", img: "/src/images/Xo kutyy.jpg" },
    { id: 4, title: "Mismatched", img: "/src/images/Mismatched.jpg" },
    { id: 5, title: "Squad game", img: "/src/images/Squad game.jpg" },
    { id: 6, title: "Amaran", img: "/src/images/Amaran.jpg" },
    { id: 7, title: "Money Hiest", img: "/src/images/Money Hiest.jpg" },
    { id: 7, title: "Stranger Things", img: "/src/images/Stranger Things.jpg" },
  ];

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleTouch = (index) => {
    const carousel = carouselRef.current;
    const itemWidth = carousel.offsetWidth / 3; 
    const scrollPosition = index * itemWidth;
    carousel.scrollTo({ left: scrollPosition, behavior: "smooth" });
  };
  return (
    <div className="horizontal-carousel">
      <h2>New this week</h2>
      <div className="carousel-container">
        <button className="scroll-button left" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="carousel" ref={carouselRef}>
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="movie-item"
              onTouchStart={() => handleTouch(index)} 
            >
              <img src={movie.img} alt={movie.title} />
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Section;