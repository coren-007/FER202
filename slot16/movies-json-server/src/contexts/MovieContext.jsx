import React, { createContext, useReducer, useContext, useEffect, useCallback, useMemo } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await movieApi.get('/movies');
      // Map poster -> avatar for UI that expects avatar
      const data = Array.isArray(response.data)
        ? response.data.map(m => ({ avatar: m.poster, name: m.title, ...m }))
        : [];
      dispatch({ type: 'SET_MOVIES', payload: data });
    } catch (error) {
      console.error('Lỗi khi tải danh sách phim:', error);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, [dispatch]);

  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });
    try {
      await movieApi.delete(`/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Lỗi khi xóa phim:', error);
      fetchMovies();
    }
  }, [fetchMovies]);

  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    try {
      // Transform form fields (name/category/rating/avatar) to server schema (title/genreId/poster)
      const payload = {
        ...dataToSend,
        title: dataToSend.title || dataToSend.name || '',
        poster: dataToSend.poster || dataToSend.avatar || '',
        genreId: dataToSend.genreId || 1,
      };
      if (isEditing) {
        await movieApi.put(`/movies/${isEditingId}`, payload);
      } else {
        await movieApi.post('/movies', payload);
      }
      dispatch({ type: 'RESET_FORM' });
      fetchMovies();
      return true;
    } catch (error) {
      console.error('Lỗi thao tác CREATE/UPDATE:', error);
      fetchMovies();
      return false;
    }
  }, [fetchMovies]);

  useEffect(() => { fetchMovies(); }, [fetchMovies]);
  const visibleMovies = useMemo(() => {
    const { movies, filters } = state;
    let list = Array.isArray(movies) ? [...movies] : [];
    const search = (filters.search || '').toLowerCase();
    const genreId = parseInt(filters.genreId || 0);
    const minDuration = parseInt(filters.minDuration || 0);
    const maxDuration = parseInt(filters.maxDuration || 0);
    if (search) {
      list = list.filter(m => (m.title || '').toLowerCase().includes(search));
    }
    if (genreId) {
      list = list.filter(m => parseInt(m.genreId || 0) === genreId);
    }
    if (minDuration) {
      list = list.filter(m => parseInt(m.duration || 0) >= minDuration);
    }
    if (maxDuration) {
      list = list.filter(m => parseInt(m.duration || 0) <= maxDuration);
    }
    list.sort((a, b) => {
      const aTitle = (a.title || '').toLowerCase();
      const bTitle = (b.title || '').toLowerCase();
      if (aTitle < bTitle) return state.filters.sort === 'desc' ? 1 : -1;
      if (aTitle > bTitle) return state.filters.sort === 'desc' ? -1 : 1;
      return 0;
    });
    return list;
  }, [state]);

  const updateFilter = useCallback((name, value) => {
    dispatch({ type: 'UPDATE_FILTER', payload: { name, value } });
  }, []);

  const resetFilters = useCallback(() => { dispatch({ type: 'RESET_FILTERS' }); }, []);

  const dispatchValue = { dispatch, fetchMovies, confirmDelete, handleCreateOrUpdate, updateFilter, resetFilters };

  return (
    <MovieStateContext.Provider value={{ ...state, visibleMovies }}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
