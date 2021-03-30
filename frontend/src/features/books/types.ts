import { Action as BaseAction } from 'redux';

export enum BookActionTypes {
  FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST',
  FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS',
  FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE',
}

type BookActionExtension<T extends BookActionTypes> = T extends BookActionTypes.FETCH_BOOKS_SUCCESS
  ? { payload: PagedList<Book> }
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
