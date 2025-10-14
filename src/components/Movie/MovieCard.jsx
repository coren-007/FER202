import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddToFavourites = () => {
    setShowToast(true);
  };

  return (
    <>
      <Card className="movie-card h-100">
        <Card.Img variant="top" src={movie.poster} alt={movie.title} style={{ height: "300px", objectFit: "cover" }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="flex-grow-1">
            {movie.description.substring(0, 100)}...
          </Card.Text>
          <div className="mb-2">
            <Badge bg="warning" className="text-dark me-2">
              {movie.genre}
            </Badge>
            <Badge bg="secondary">{movie.year}</Badge>
          </div>
          <div className="mb-2 text-muted small">
            <div>{movie.country} • {movie.duration} min</div>
          </div>
          <div className="mt-auto d-flex justify-content-between gap-2">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Details
            </Button>
            <Button variant="outline-warning" size="sm" onClick={handleAddToFavourites}>
              Add to Favourite
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={movie.poster} alt={movie.title} className="w-100 mb-3" style={{ maxHeight: "400px", objectFit: "cover" }} />
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Genre:</strong> <Badge bg="warning" className="text-dark">{movie.genre}</Badge></p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Country:</strong> {movie.country}</p>
          <p><strong>Duration:</strong> {movie.duration} minutes</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body>
            {movie.title} has been added to your favourites.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
