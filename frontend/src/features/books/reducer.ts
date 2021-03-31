import { BookAction, BookActionTypes, CartItem, State } from './types';

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

const updateCart = (cart: CartItem[], id: number, quantity: number): CartItem[] => {
  const indexOfCart = ~(~cart.findIndex(i => i.id === id) || ~cart.length);
  const newQuantity = (cart[indexOfCart]?.quantity ?? 0) + quantity;
  if (newQuantity < 1) return [...cart.slice(0, indexOfCart), ...cart.slice(indexOfCart + 1)];
  return [
    ...cart.slice(0, indexOfCart),
    { id, quantity: newQuantity },
    ...cart.slice(indexOfCart + 1),
  ];
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
    case BookActionTypes.ADD_BOOK_TO_CART: {
      const { payload } = action as BookAction<BookActionTypes.ADD_BOOK_TO_CART>;
      return { ...state, cart: updateCart(state.cart, payload.id, payload.qty) };
    }
    case BookActionTypes.REMOVE_BOOK_FROM_CART: {
      const { payload } = action as BookAction<BookActionTypes.ADD_BOOK_TO_CART>;
      return { ...state, cart: updateCart(state.cart, payload.id, -payload.qty) };
    }
    default:
      return state;
  }
};

export default reducer;
