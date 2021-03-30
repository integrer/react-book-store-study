import { BookAction, BookActionTypes, State } from './types';

const initialState: State = {
  list: {
    totalPages: 0,
    currentPage: 0,
    items: [],
  },
  loading: false,
  error: false,
  items: {},
  cart: [],
};

const reducer = (state = initialState, action?: BookAction) => {
  switch (action?.type) {
    case BookActionTypes.FETCH_BOOKS_REQUEST:
      return { ...state, loading: true };
    case BookActionTypes.FETCH_BOOKS_SUCCESS: {
      const { payload } = action as BookAction<BookActionTypes.FETCH_BOOKS_SUCCESS>;
      const list = { ...payload, items: payload.items.map(({ id }) => id) };
      const items = payload.items.reduceRight((acc, i) => ({ ...acc, [i.id]: i }), state.items);
      return { ...state, list, items, error: false, loading: false };
    }
    case BookActionTypes.FETCH_BOOKS_CANCEL:
      return { ...state, loading: false };
    case BookActionTypes.FETCH_BOOKS_FAILURE:
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
};

export default reducer;
