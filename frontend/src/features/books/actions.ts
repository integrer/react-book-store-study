import { ThunkDispatch } from 'redux-thunk';
import { BookAction, Book, BookActionTypes, PagedList } from './types';
import Axios, { AxiosInstance, Canceler } from 'axios';
import { RootState } from '~/store';

interface PageParams {
  page?: number;
  pageSize?: number;
}

const loadBookPagedList = (() => {
  let cancelFetchBooks: Canceler | undefined | null;

  return async (axios: AxiosInstance, pageParams: PageParams): Promise<PagedList<Book>> => {
    cancelFetchBooks?.();
    const { token, cancel } = Axios.CancelToken.source();
    cancelFetchBooks = cancel;
    try {
      return await axios.get('books', { cancelToken: token, params: pageParams });
    } finally {
      if (cancelFetchBooks === cancel) cancelFetchBooks = null;
    }
  };
})();

const isPageOutOfRange = ({ currentPage, totalPages }: PagedList<any>) =>
  currentPage > totalPages - 1;

export const fetchBooks = (axios: AxiosInstance, pageParams: PageParams) => async (
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
    if (Axios.isCancel(e)) return;
    dispatch({ type: BookActionTypes.FETCH_BOOKS_FAILURE });
    throw e;
  }
};