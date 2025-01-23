import React, { useRef } from "react";
import "./Sec2.css";

const Sections =()=> {
  const carouselRef = useRef(null);

  const slideLeft = () => {
    carouselRef.current.scrollBy({
      left: -300, // Adjust to define the scroll distance
      behavior: "smooth",
    });
  };

  const slideRight = () => {
    carouselRef.current.scrollBy({
      left: 300, // Adjust to define the scroll distance
      behavior: "smooth",
    });
  };

  const movies = [
    { id: 1, src: "/src/images/Rectangle 1.jpeg", alt: "Movie 1" },
    { id: 2, src: "/src/images/Rectangle 2.jpeg", alt: "Movie 2" },
    { id: 3, src: "/src/images/Rectangle 3.jpeg", alt: "Movie 3" },
    { id: 4, src: "/src/images/Rectangle 4.jpeg", alt: "Movie 4" },
    { id: 5, src: "/src/images/Rectangle 5.jpeg", alt: "Movie 5" },
    { id: 6, src: "/src/images/Rectangle 6.jpeg", alt: "Movie 6" },
    { id: 7, src: "/src/images/Rectangle 7.png", alt: "Movie 7" },
    { id: 8, src: "/src/images/Rectangle 8.png", alt: "Movie 8" },
    { id: 9, src: "/src/images/Rectangle 9.png", alt: "Movie 9" },
    { id: 10, src: "/src/images/Rectangle 10.png", alt: "Movie 10" },
  ];

  return (
    <div className="section">
      <h2>Trending Now</h2>
      <div className="carousel-container">
        {/* Left Button */}
        <button className="carousel-btn left" onClick={slideLeft}>
          &#8249; {/* Left Arrow Symbol */}
        </button>

        {/* Carousel */}
        <div className="carousel" ref={carouselRef}>
          {movies.map((movie) => (
            <div className="carousel-item" key={movie.id}>
              <img src={movie.src} alt={movie.alt} />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button className="carousel-btn right" onClick={slideRight}>
          &#8250; {/* Right Arrow Symbol */}
        </button>
      </div>
    </div>
  );
}

export default Sections;