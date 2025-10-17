//ex2
import React, { useReducer } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';

// Khởi tạo trạng thái ban đầu
const initialState = { isOn: false };

// Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { isOn: !state.isOn };
    case 'TURN_ON':
      return { isOn: true };
    case 'TURN_OFF':
      return { isOn: false };
    default:
      return state;
  }
}

function ToggleComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggle = () => dispatch({ type: 'TOGGLE' });
  const turnOn = () => dispatch({ type: 'TURN_ON' });
  const turnOff = () => dispatch({ type: 'TURN_OFF' });

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <Card.Title className="text-center mb-4 fs-4 fw-bold">
          Bật/Tắt Trạng Thái
        </Card.Title>
        <div className="text-center">
          <div className="mb-4">
            <Badge 
              bg={state.isOn ? 'success' : 'secondary'} 
              className="fs-3 px-4 py-3"
            >
              {state.isOn ? 'BẬT (ON)' : 'TẮT (OFF)'}
            </Badge>
          </div>
          <div 
            className="mb-4 p-4 rounded"
            style={{
              backgroundColor: state.isOn ? 'hsl(var(--success))' : 'hsl(var(--muted))',
              transition: 'all 0.3s ease',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div 
              className="rounded-circle bg-white"
              style={{
                width: '60px',
                height: '60px',
                boxShadow: state.isOn ? '0 0 20px rgba(34, 197, 94, 0.6)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          </div>
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Button
              variant="primary"
              size="lg"
              onClick={toggle}
              className="px-4"
            >
              Chuyển Đổi
            </Button>
            <Button
              variant="success"
              size="lg"
              onClick={turnOn}
              className="px-4"
              disabled={state.isOn}
            >
              Bật
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={turnOff}
              className="px-4"
              disabled={!state.isOn}
            >
              Tắt
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ToggleComponent;
