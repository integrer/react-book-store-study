import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '~/store';
import AppSettings from '~/app-settings';
import Preloader from '~/components/preloader';
import List from './list';
import { fetchBooks, cancelFetchBooks } from '../actions';

const AppSettingsAware = () => {
  return (
    <AppSettings.Consumer>
      {appSettings => {
        const mapState = ({ books: { loading, error, items, list } }: RootState) => ({
          loading,
          error,
          items,
          list,
        });

        const mapDispatch = { fetchBooks };

        const connector = connect(mapState, mapDispatch);

        const Component = (props: ConnectedProps<typeof connector>) => {
          if (props.loading) return <Preloader />;
          if (props.error) return <>Some error occurred...</>;
          useEffect(() => {
            props.fetchBooks(appSettings.api(), {});
            return cancelFetchBooks;
          }, []);
          const books = props.list.items.map(i => props.items[i]);
          return (
            <>
              <List books={books} />
            </>
          );
        };
        return connector(Component);
      }}
    </AppSettings.Consumer>
  );
};

export default AppSettingsAware;
