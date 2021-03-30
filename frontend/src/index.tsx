import React from 'react';
import ReactDOM from 'react-dom';
import AppSettings, { appSettings } from './app-settings';
import List from './features/books/list';
import Cart from './features/books/cart';

ReactDOM.render(
  <React.StrictMode>
    <AppSettings.Provider value={appSettings}>
      <List books={[]} />
      <Cart />
    </AppSettings.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
