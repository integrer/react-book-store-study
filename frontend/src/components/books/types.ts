import { Action as BaseAction } from 'redux';

export enum BookActions {
  FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST',
  FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS',
  FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE',
}

export interface Action extends BaseAction<BookActions> {
  [k: string]: any;
}

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
