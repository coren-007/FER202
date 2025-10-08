import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import "./HomeCarousel.css";

function HomeCarousel() {
  const movies = [
    {
      title: "Inception",
      genre: "Sci-Fi",
      img: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
    },
    {
      title: "The Dark Knight",
      genre: "Action",
      img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQXngTTjaRrAmPMTHdSAJijb1I9E4bmlMaLnOvM4tlzYLaKuYs8fnUPd2i-khMAGLp8M4raAitEEswprImsPzcG5Be34SMTlegt2E72JIoiCA",
    },
    {
      title: "Interstellar",
      genre: "Adventure",
      img: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
    },
  ];

  return (
    <Carousel fade interval={3000} pause={false}>
      {movies.map((movie, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100 carousel-image"
            src={movie.img}
            alt={`${movie.title} poster`}
          />
          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <Badge bg="info">{movie.genre}</Badge>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;
