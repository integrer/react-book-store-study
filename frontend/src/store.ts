import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import booksReducer from '~/components/books/reducer';

const store = configureStore({
  reducer: { books: booksReducer },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
