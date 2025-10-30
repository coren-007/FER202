import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import movieApi from '../api/movieAPI';

const FilterBar = () => {
  const { filters } = useMovieState();
  const { updateFilter, resetFilters } = useMovieDispatch();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const res = await movieApi.get('/genres');
        setGenres(Array.isArray(res.data) ? res.data : []);
      } catch {
        setGenres([]);
      }
    };
    loadGenres();
  }, []);

  return (
    <div className="p-3 border rounded bg-light">
      <Row className="g-3">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên phim"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={filters.genreId}
            onChange={(e) => updateFilter('genreId', e.target.value)}
          >
            <option value="">Lọc theo thể loại</option>
            {genres.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            placeholder="Thời lượng tối thiểu"
            value={filters.minDuration}
            onChange={(e) => updateFilter('minDuration', e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            placeholder="Thời lượng tối đa"
            value={filters.maxDuration}
            onChange={(e) => updateFilter('maxDuration', e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
          >
            <option value="asc">Sắp xếp: Tên A→Z</option>
            <option value="desc">Sắp xếp: Tên Z→A</option>
          </Form.Select>
        </Col>
      </Row>

      <div className="mt-3 d-flex gap-2">
        <Button variant="secondary" onClick={resetFilters}>Đặt lại bộ lọc</Button>
      </div>
    </div>
  );
};

export default FilterBar;