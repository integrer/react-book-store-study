import { ThunkDispatch } from 'redux-thunk';
import { Book, BookAction, BookActionTypes, PagedList } from './types';
import Axios, { AxiosInstance, Canceler } from 'axios';
import { RootState } from '~/store';

export interface PageParams {
  page?: number;
  pageSize?: number;
}

const { loadBookPagedList, cancelFetchBooks } = (() => {
  let cancelFetchBooks: Canceler | undefined | null;

  return {
    cancelFetchBooks: () => {
      cancelFetchBooks?.();
    },
    loadBookPagedList: async (
      axios: AxiosInstance,
      pageParams?: PageParams,
    ): Promise<PagedList<Book>> => {
      cancelFetchBooks?.();
      const { token, cancel } = Axios.CancelToken.source();
      cancelFetchBooks = cancel;
      try {
        return (
          await axios.get<PagedList<Book>>('books', { cancelToken: token, params: pageParams })
        ).data;
      } finally {
        if (cancelFetchBooks === cancel) cancelFetchBooks = null;
      }
    },
  };
})();

export { cancelFetchBooks };

const isPageOutOfRange = ({ currentPage, totalPages }: PagedList<any>) =>
  currentPage > totalPages - 1;

export const fetchBooks = (axios: AxiosInstance, pageParams?: PageParams) => async (
  dispatch: ThunkDispatch<RootState, void, BookAction>,
  _getState: () => RootState,
) => {
  dispatch({ type: BookActionTypes.FETCH_BOOKS_REQUEST });
  try {
    const payload = await loadBookPagedList(axios, pageParams);
    if (isPageOutOfRange(payload)) {
      await dispatch(fetchBooks(axios, { ...pageParams, page: payload.totalPages - 1 }));
    } else {
      dispatch({ type: BookActionTypes.FETCH_BOOKS_SUCCESS, payload });
    }
  } catch (e) {
    if (Axios.isCancel(e)) dispatch({ type: BookActionTypes.FETCH_BOOKS_CANCEL });
    else {
      dispatch({ type: BookActionTypes.FETCH_BOOKS_FAILURE });
      throw e;
    }
  }
};

export const addBookToCart = (
  id: number,
  qty = 1,
): BookAction<BookActionTypes.ADD_BOOK_TO_CART> => ({
  type: BookActionTypes.ADD_BOOK_TO_CART,
  payload: { id, qty },
});

export const removeBookFromCart = (
  id: number,
  qty = 1,
): BookAction<BookActionTypes.REMOVE_BOOK_FROM_CART> => ({
  type: BookActionTypes.REMOVE_BOOK_FROM_CART,
  payload: { id, qty },
});
