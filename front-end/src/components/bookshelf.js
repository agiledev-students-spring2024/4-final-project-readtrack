import React from "react";
import PropTypes from "prop-types";

const BookShelf = ({ title, bookCovers = [] }) => {
  const placeholder = "https://placehold.co/400x600"; // Placeholder image URL

  return (
    <div className="flex flex-col text-left py-4 pl-4 justify-center bg-custom-gradient outline-4 outline-goodreads-darkbrown w-full">
      <h2 className="text-l text-black align-middle font-semibold py-1">
        {title}
      </h2>
      <div className="flex space-x-4 overflow-x-auto m-3">
        {bookCovers.length > 0
          ? bookCovers.map((cover, i) => (
            <img
              key={i}
              src={cover || placeholder}
              alt={`Book ${i + 1}`}
              className="w-20 h-30 object-cover border-2"
            />
          ))
          : Array(10)
            .fill()
            .map(
              (_, i) => (
                <img
                  key={i}
                  src={placeholder}
                  alt={`Book ${i + 1}`}
                  className="w-20 h-30 object-cover border-2"
                />
              )
            )}
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  bookCovers: PropTypes.arrayOf(PropTypes.string),
};

export default BookShelf;
