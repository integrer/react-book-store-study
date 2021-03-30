import React from 'react';

export default () => {
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {Array.from({ length: 5 }, (v, idx) => (
          <li key={idx}>Option {idx + 1}</li>
        ))}
      </ul>
    </div>
  );
};
