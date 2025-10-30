import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

// 1. Khởi tạo trạng thái ban đầu
const initialState = { count: 0 };

// 3. Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

const CounterComponent = () => {
  // 4. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme, toggleTheme } = useTheme();

  // Action handlers
  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement' });
  const reset = () => dispatch({ type: 'reset' });

  return (
    <Card className="card-custom mb-4">
      <Card.Body>
        <Card.Title className="mb-4">
          <h2 className="fw-bold">Bộ Đếm Đa Năng</h2>
        </Card.Title>
        <div className="text-center mb-4">
          <p className="display-4 fw-bold text-primary mb-0">{state.count}</p>
          <small className="text-muted">Giá trị hiện tại</small>
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
            onClick={increment}
            className="px-4"
          >
            ➕ Tăng (+1)
          </Button>
          <Button
            variant="warning"
            onClick={decrement}
            className="px-4"
          >
            ➖ Giảm (-1)
          </Button>
          <Button
            variant="danger"
            onClick={reset}
            className="px-4"
          >
            🔄 Reset
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CounterComponent;
