import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import Filter from "../components/Filter/Filter";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movies";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Filter movies
  let filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesYear = true;
    if (yearFilter === "<=2000") matchesYear = movie.year <= 2000;
    else if (yearFilter === "2001-2015")
      matchesYear = movie.year >= 2001 && movie.year <= 2015;
    else if (yearFilter === ">2015") matchesYear = movie.year > 2015;

    return matchesSearch && matchesYear;
  });

  // Sort movies
  if (sortBy === "year-asc") {
    filteredMovies.sort((a, b) => a.year - b.year);
  } else if (sortBy === "year-desc") {
    filteredMovies.sort((a, b) => b.year - a.year);
  } else if (sortBy === "title-asc") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "title-desc") {
    filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortBy === "duration-asc") {
    filteredMovies.sort((a, b) => a.duration - b.duration);
  } else if (sortBy === "duration-desc") {
    filteredMovies.sort((a, b) => b.duration - a.duration);
  }

  return (
    <div>
      <HomeCarousel />
      <Container className="mt-4">
        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <h4 className="mb-3">Featured Movies Collections</h4>
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredMovies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
