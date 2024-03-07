import React from 'react';
import PropTypes from 'prop-types';

const BookShelf = ({ title, bookCovers = [] }) => {
  const placeholder = 'https://via.placeholder.com/100'; // Placeholder image URL

  return (
    <div className="flex flex-col text-left bg-cyan-950 my-8">
      <h2 className="text-2xl text-white font-bold mb-4 ">{title}</h2>
      <div className="flex space-x-4 m-3" >
        {Array(4).fill().map((_, i) => (
          <img
            key={i}
            src={bookCovers[i] || placeholder}
            alt={`Book ${i + 1}`}
            className="w-20 h-30 object-cover border-2"
          />
        ))}
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  bookCovers: PropTypes.arrayOf(PropTypes.string),
};

export default BookShelf;