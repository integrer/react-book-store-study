import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '~/store';
import AppSettings from '~/app-settings';
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
          const books = state.list.items.map(i => state.items[i]);
          return (
            <>
              <List books={books} />
            </>
          );
        };
        return <Component />;
      }}
    </AppSettings.Consumer>
  );
};

export default AppSettingsAware;
