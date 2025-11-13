 import { Modal, Button } from 'react-bootstrap'

/**
 * Hộp thoại xác nhận đơn giản.
 * @param {{
 *  show: boolean, // Hiển thị hộp thoại
 *  onHide?: Function, // Hàm xử lý khi nhấn nút đóng
 *  onConfirm?: Function, // Hàm xử lý khi nhấn nút xác nhận
 *  title?: string, // Tiêu đề hộp thoại
 *  message?: string, // Nội dung hộp thoại
 * }} props
 */
export default function ConfirmModal({ show, onHide, onConfirm, title, message }) {
  // Xử lý hành động khi nhấn nút OK
  const handle = onConfirm || onHide
  return (
    // Hộp thoại xác nhận
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
