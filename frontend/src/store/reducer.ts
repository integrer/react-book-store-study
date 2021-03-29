interface PagedList<I> {
  totalPages: number;
  currentPage: number;
  items: I[];
}

interface Book {
  id: number;
  author: string;
  genre: string;
  name: string;
  year: number;
}

interface CartItem {
  id: number;
  quantity: number;
}

interface State {
  list: PagedList<number>;
  loading: boolean;
  error: boolean;
  items: Record<number, Book>;
  cart: CartItem[];
}

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

const reducer = (state = initialState, action: { type?: string } & object = {}) => {
  const { type } = action;
  switch (type) {
    case 'FETCH_BOOKS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_BOOKS_SUCCESS': {
      const { payload } = action as { payload: PagedList<Book> };
      const list = { ...payload, items: payload.items.map(({ id }) => id) };
      const items = {
        ...state.items,
        ...payload.items.reduceRight((acc, i) => ({ ...acc, [i.id]: i }), <Record<number, Book>>{}),
      };
      return { ...state, list, items, error: false, loading: false };
    }
    case 'FETCH_BOOKS_FAILURE':
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
};

export default reducer;
