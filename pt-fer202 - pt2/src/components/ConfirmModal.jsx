 import { Modal, Button } from 'react-bootstrap'

 export default function ConfirmModal({ show, onHide, onConfirm, title, message }) {
   const handle = onConfirm || onHide
   return (
     <Modal show={show} onHide={onHide || onConfirm} centered>
       <Modal.Header closeButton>
         <Modal.Title>{title}</Modal.Title>
       </Modal.Header>
       <Modal.Body>{message}</Modal.Body>
       <Modal.Footer>
         <Button variant="primary" onClick={handle}>OK</Button>
       </Modal.Footer>
     </Modal>
   )
 }
