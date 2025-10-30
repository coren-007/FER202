import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import movieApi from '../api/movieAPI';

const initialAuthState = {
  user: null,
  loading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false, error: null };
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export const AuthStateContext = createContext(initialAuthState);
export const AuthDispatchContext = createContext(null);

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Load user from localStorage on first load
  useEffect(() => {
    const saved = localStorage.getItem('auth:user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          dispatch({ type: 'SET_USER', payload: parsed });
        }
      } catch {}
    }
  }, []);

  const login = useCallback(async (username, password) => {
    dispatch({ type: 'START_LOADING' });
    try {
      // Lấy tất cả tài khoản và kiểm tra thủ công
      const res = await movieApi.get('/accounts');
      const u = (username ?? '').trim();
      const p = (password ?? '').trim();
      const user = res.data.find(acc => acc.username === u && acc.password === p);
      
      if (!user) {
        dispatch({ type: 'SET_ERROR', payload: 'Sai tài khoản hoặc mật khẩu' });
        return false;
      }
      dispatch({ type: 'SET_USER', payload: user });
      localStorage.setItem('auth:user', JSON.stringify(user));
      return true;
    } catch (e) {
      console.error('Login error:', e);
      dispatch({ type: 'SET_ERROR', payload: 'Không thể đăng nhập. Vui lòng thử lại.' });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth:user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const dispatchValue = { dispatch, login, logout };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatchValue}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};