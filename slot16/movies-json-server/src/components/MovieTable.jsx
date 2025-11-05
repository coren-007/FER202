import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { visibleMovies: movies, loading, movieToDelete, showDeleteModal, showDetailsModal, movieDetails } = state;

  const genreMap = { 1: 'Sci-Fi', 2: 'Comedy', 3: 'Drama', 4: 'Horror', 5: 'Romance', 6: 'Action', 7: 'Thriller' };

  const handleEditClick = (movie) => { dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie }); };
  const handleDeleteClick = (movie) => { dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie }); };
  const handleViewDetails = (movie) => { dispatch({ type: 'OPEN_DETAILS_MODAL', payload: movie }); };

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" variant="primary" className="me-2" />
          <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Danh mục</th>
              <th>Thời lượng (phút)</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td><Image src={movie.avatar} alt={movie.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded /></td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">({movie.year})</small>
                  </td>
                  <td>{genreName}</td>
                  <td>{movie.duration} phút</td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => handleViewDetails(movie)} className="me-2">Xem chi tiết</Button>
                    <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">Sửa</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>Xóa</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim "{movieToDelete?.title}" (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>Hủy bỏ</Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>Xác nhận Xóa</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetailsModal} onHide={() => dispatch({ type: 'CLOSE_DETAILS_MODAL' })} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movieDetails && (
            <div className="d-flex">
              <Image src={movieDetails.avatar} alt={movieDetails.title} rounded style={{ width: 120, height: 120, objectFit: 'cover', marginRight: 16 }} />
              <div>
                <h5 className="mb-2">{movieDetails.title}</h5>
                <div><strong>Thể loại:</strong> {genreMap[movieDetails.genreId] || 'Unknown'}</div>
                <div><strong>Năm:</strong> {movieDetails.year}</div>
                <div><strong>Thời lượng:</strong> {movieDetails.duration} phút</div>
                {movieDetails.description && (<div className="mt-2"><strong>Mô tả:</strong> {movieDetails.description}</div>)}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DETAILS_MODAL' })}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
