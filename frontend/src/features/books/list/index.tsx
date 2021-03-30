import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '~/store';
import AppSettings from '~/app-settings';
import Pagination from 'react-paginate';
import Preloader from '~/components/preloader';
import List from './list';
import { fetchBooks, cancelFetchBooks } from '../actions';

const AppSettingsAware = () => {
  return (
    <AppSettings.Consumer>
      {appSettings => {
        const Component = () => {
          const state = useSelector(({ books: { loading, error, items, list } }: RootState) => ({
            loading,
            error,
            items,
            list,
          }));
          const dispatch = useDispatch<RootDispatch>();
          useEffect(() => {
            dispatch(fetchBooks(appSettings.api()));
            return cancelFetchBooks;
          }, []);
          if (state.loading) return <Preloader />;
          if (state.error) return <>Some error occurred...</>;
          const { list, items } = state;
          const books = list.items.map(i => items[i]);
          return (
            <>
              <List books={books} />
              <Pagination
                pageRangeDisplayed={5}
                forcePage={list.currentPage}
                pageCount={list.totalPages}
                marginPagesDisplayed={3}
                onPageChange={({ selected }) => {
                  dispatch(fetchBooks(appSettings.api(), { page: selected }));
                }}
              />
            </>
          );
        };
        return <Component />;
      }}
    </AppSettings.Consumer>
  );
};

export default AppSettingsAware;
