import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppSettings, { appSettings } from './app-settings';
import List from './features/books/list';
import Cart from './features/books/cart';
import store from '~/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppSettings.Provider value={appSettings}>
        <List />
        <Cart />
      </AppSettings.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
