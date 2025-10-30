import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

// 1. Khởi tạo trạng thái ban đầu
interface LightState {
  isOn: boolean;
}

const initialState: LightState = { isOn: false };

// 2. Định nghĩa các action types
type LightAction = 
  | { type: 'toggle' }
  | { type: 'turnOn' }
  | { type: 'turnOff' };

// 3. Định nghĩa hàm reducer
function reducer(state: LightState, action: LightAction): LightState {
  switch (action.type) {
    case 'toggle':
      return { isOn: !state.isOn };
    case 'turnOn':
      return { isOn: true };
    case 'turnOff':
      return { isOn: false };
    default:
      return state;
  }
}

const LightSwitch: React.FC = () => {
  // 4. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme, toggleTheme } = useTheme();

  // Action handlers
  const toggle = () => dispatch({ type: 'toggle' });
  const turnOn = () => dispatch({ type: 'turnOn' });
  const turnOff = () => dispatch({ type: 'turnOff' });

  return (
    <Card className="card-custom mb-4">
      <Card.Body>
        <Card.Title className="mb-4">
          <h2 className="fw-bold">Công Tắc Đèn</h2>
        </Card.Title>
        <div className="text-center mb-4">
          <div className="display-1 mb-3">
            {state.isOn ? '💡' : '🌑'}
          </div>
          <p className="display-6 fw-bold mb-0">
            Đèn hiện đang: <span className={state.isOn ? 'text-success' : 'text-danger'}>
              {state.isOn ? 'Bật' : 'Tắt'}
            </span>
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <Button 
            variant={theme === 'light' ? 'secondary' : 'light'}
            onClick={toggleTheme}
            className="px-4"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button>
          <Button
            variant="primary"
            onClick={toggle}
            className="px-4"
          >
            🔄 Chuyển Đổi
          </Button>
          <Button
            variant="success"
            onClick={turnOn}
            className="px-4"
          >
            ✅ Bật Đèn
          </Button>
          <Button
            variant="danger"
            onClick={turnOff}
            className="px-4"
          >
            ❌ Tắt Đèn
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LightSwitch;
