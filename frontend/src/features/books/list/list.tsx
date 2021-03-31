import React from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '~/store';
import { Book } from '../types';
import { addBookToCart } from '../actions';

export default ({ books }: { books: Book[] }) => {
  const dispatch = useDispatch<RootDispatch>();
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Book</th>
          <th>Author</th>
          <th>Year</th>
          <th>Genre</th>
          <th>ISBN</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {books.map(({ id, name, author, year, genre, isbn }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{author}</td>
            <td>{year}</td>
            <td>{genre}</td>
            <td>{isbn}</td>
            <td>
              <button
                className="btn btn-success"
                type="button"
                onClick={() => {
                  dispatch(addBookToCart(id));
                }}
              >
                Add to cart
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
