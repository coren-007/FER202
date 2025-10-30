import React, { createContext, useContext, useReducer } from 'react';

// Định nghĩa kiểu dữ liệu cho user
export const mockAccounts = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin',
    status: 'active'
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    password: '123456',
    role: 'user',
    status: 'active'
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    password: '123456',
    role: 'user',
    status: 'locked'
  }
];

// 1. Khởi tạo trạng thái ban đầu
const initialState = {
  user: null,
  isAuthenticated: false,
  error: null
};

// 2. Định nghĩa hàm reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

// 3. Khởi tạo context
const AuthContext = createContext();

// 4. Tạo Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Hàm xử lý đăng nhập
  const login = (username, password) => {
    // Tìm user trong mock data
    const user = mockAccounts.find(
      (account) => 
        (account.username === username || account.email === username) && 
        account.password === password
    );

    if (!user) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: 'Tên đăng nhập hoặc mật khẩu không đúng!' 
      });
      return;
    }

    if (user.status === 'locked') {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: 'Tài khoản đã bị khóa!' 
      });
      return;
    }

    if (user.role !== 'admin') {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: 'Chỉ admin mới được phép đăng nhập!' 
      });
      return;
    }

    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  };

  // Hàm xử lý đăng xuất
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Hàm xóa error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue = {
    state,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Custom hook để sử dụng context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
