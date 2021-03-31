import { Action as BaseAction } from 'redux';

export enum BookActionTypes {
  FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST',
  FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS',
  FETCH_BOOKS_CANCEL = 'FETCH_BOOKS_CANCEL',
  FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE',
  ADD_BOOK_TO_CART = 'ADD_BOOK_TO_CART',
  REMOVE_BOOK_FROM_CART = 'REMOVE_BOOK_FROM_CART',
}

type BookActionExtension<T extends BookActionTypes> = T extends BookActionTypes.FETCH_BOOKS_SUCCESS
  ? { payload: PagedList<Book> }
  : T extends BookActionTypes.ADD_BOOK_TO_CART | BookActionTypes.REMOVE_BOOK_FROM_CART
  ? { payload: { id: number; qty: number } }
  : {};

export type BookAction<T extends BookActionTypes = BookActionTypes> = BaseAction<T> &
  BookActionExtension<T>;

export interface PagedList<I> {
  totalPages: number;
  currentPage: number;
  items: I[];
}

export interface Book {
  id: number;
  author: string;
  genre: string;
  name: string;
  year: number;
  isbn: string;
}

interface CartItem {
  id: number;
  quantity: number;
}

export interface State {
  list: PagedList<number>;
  loading: boolean;
  error: boolean;
  items: Record<number, Book>;
  cart: CartItem[];
}
