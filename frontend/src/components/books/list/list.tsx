import React from 'react';

const books = Array.from({ length: 5 }, (_v, idx) => ({
  name: `Book ${idx + 1}`,
  author: `Author ${idx + 1}`,
  year: 2015 + idx,
  genre: `Genre ${idx + 1}`,
  isbn: Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join(''),
}));

export default () => {
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
        {books.map(({ name, author, year, genre, isbn }) => (
          <tr>
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
