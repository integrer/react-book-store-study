import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/list';
import Cart from './components/cart';

ReactDOM.render(
  <React.StrictMode>
    <List />
    <Cart />
  </React.StrictMode>,
  document.getElementById('root'),
);
