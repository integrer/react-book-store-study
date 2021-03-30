import React from 'react';
import ReactDOM from 'react-dom';
import AppSettings, { appSettings } from './app-settings';
import List from './components/books/list';
import Cart from './components/books/cart';

ReactDOM.render(
  <React.StrictMode>
    <AppSettings.Provider value={appSettings}>
      <List />
      <Cart />
    </AppSettings.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
