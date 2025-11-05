export const initialMovieState = {
  movies: [],
  loading: false,
  isEditing: null,
  currentMovie: { avatar: '', name: '', category: '', duration: '', year: '', rating: '' },
  showEditModal: false,
  showDeleteModal: false,
  movieToDelete: null,
  // Details modal state
  showDetailsModal: false,
  movieDetails: null,
  filters: { search: '', genreId: '', minDuration: '', maxDuration: '', sort: 'asc' }
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload, loading: false };
    case 'START_LOADING':
      return { ...state, loading: true };
    case 'UPDATE_FIELD':
      return { ...state, currentMovie: { ...state.currentMovie, [action.payload.name]: action.payload.value } };
    case 'OPEN_EDIT_MODAL':
      return { ...state, currentMovie: action.payload, isEditing: action.payload.id, showEditModal: true };
    case 'CLOSE_EDIT_MODAL':
      return { ...state, currentMovie: initialMovieState.currentMovie, isEditing: null, showEditModal: false };
    case 'OPEN_DELETE_MODAL':
      return { ...state, movieToDelete: action.payload, showDeleteModal: true };
    case 'CLOSE_DELETE_MODAL':
      return { ...state, movieToDelete: null, showDeleteModal: false };
    case 'OPEN_DETAILS_MODAL':
      return { ...state, movieDetails: action.payload, showDetailsModal: true };
    case 'CLOSE_DETAILS_MODAL':
      return { ...state, movieDetails: null, showDetailsModal: false };
    case 'RESET_FORM':
      return { ...state, currentMovie: initialMovieState.currentMovie, isEditing: null, showEditModal: false };
    case 'UPDATE_FILTER':
      return { ...state, filters: { ...state.filters, [action.payload.name]: action.payload.value } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialMovieState.filters };
    default:
      return state;
  }
};
