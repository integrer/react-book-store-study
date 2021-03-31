import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '~/store';
import { addBookToCart, removeBookFromCart } from '../actions';

export default () => {
  const { items, cart } = useSelector(({ books: { items, cart } }: RootState) => ({ items, cart }));
  const dispatch = useDispatch<RootDispatch>();
  return (
    <div>
      <h1>Cart</h1>
      {cart.length ? (
        cart.map(({ quantity, id }) => {
          const book = items[id];
          return (
            <div className="card m-2" key={id}>
              <div className="card-body">
                <div className="cart-title">{book.name}</div>
                <div className="card-text">{book.author}</div>
                <div className="card-text">Quantity: {quantity}</div>
                <div className="row">
                  <div className="col" />
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        dispatch(addBookToCart(id));
                      }}
                    >
                      Add one
                    </button>
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        dispatch(removeBookFromCart(id));
                      }}
                    >
                      Remove one
                    </button>
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        dispatch(removeBookFromCart(id, quantity));
                      }}
                    >
                      Remove all
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <>No items in cart...</>
      )}
    </div>
  );
};
