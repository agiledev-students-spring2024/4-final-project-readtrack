import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BookShelf = ({ title, bookCovers = [] }) => {
  const placeholder = "https://picsum.photos/400/600";

  return (
    <div className="flex flex-col text-left py-4 pl-4 justify-center bg-custom-gradient w-full">
      <h2 className="text-l text-black align-middle font-semibold py-1">
        {title}
      </h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide py-4">
        {bookCovers.length > 0
          ? bookCovers.map((cover, i) => (
              <Link key={i} to="/title-by-author" className="shrink-0">
                <img
                  src={cover || placeholder}
                  alt={`Book ${i + 1}`}
                  className="w-20 h-30"
                />
              </Link>
            ))
          : Array(20)
              .fill()
              .map((_, i) => (
                <Link key={i} to="/title-by-author" className="shrink-0">
                  <img
                    src={placeholder}
                    alt={`Book ${i + 1}`}
                    className="w-20 h-30"
                  />
                </Link>
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
