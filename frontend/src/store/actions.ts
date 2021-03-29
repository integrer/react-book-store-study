import { ThunkDispatch } from 'redux-thunk';
import { Action, Book, BookActions, PagedList, State } from './types';
import Axios, { AxiosInstance, Canceler } from 'axios';

let cancelFetchBooks: Canceler | undefined | null;

interface PageParams {
  page?: number;
  pageSize?: number;
}

const isPageOutOfRange = ({ currentPage, totalPages }: PagedList<any>) =>
  currentPage > totalPages - 1;

export const fetchBooks = (axios: AxiosInstance, pageParams: PageParams) => async (
  dispatch: ThunkDispatch<State, void, Action>,
  _getState: () => State,
) => {
  cancelFetchBooks?.();
  dispatch({ type: BookActions.FETCH_BOOKS_REQUEST });
  let payload: PagedList<Book>;
  try {
    const { token, cancel } = Axios.CancelToken.source();
    cancelFetchBooks = cancel;
    payload = await axios.get('books', { cancelToken: token, params: pageParams });
  } catch (e) {
    if (!Axios.isCancel(e)) {
      dispatch({ type: BookActions.FETCH_BOOKS_FAILURE });
      throw e;
    }
    return;
  } finally {
    cancelFetchBooks = null;
  }
  if (isPageOutOfRange(payload)) {
    await dispatch(fetchBooks(axios, { ...pageParams, page: payload.totalPages - 1 }));
  } else {
    dispatch({ type: BookActions.FETCH_BOOKS_SUCCESS, payload });
  }
};
