import React from 'react';
import { Book } from '../types';

export default ({ books }: { books: Book[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Book</th>
          <th>Author</th>
          <th>Year</th>
          <th>Genre</th>
          <th>ISBN</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};
