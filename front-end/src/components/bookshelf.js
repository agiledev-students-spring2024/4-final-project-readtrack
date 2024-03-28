import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const placeholders = Array(20).fill("https://picsum.photos/400/600");

const BookShelf = ({ books , title }) => {

  return (
    <div className="flex flex-col text-left py-4 pl-4 justify-center bg-custom-gradient w-full">
      <h2 className="text-l text-black align-middle font-semibold py-1">
        {/* {{title}} */}
      </h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide py-4">
        {books.length > 0 ? (
          books.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`} className="shrink-0">
              <img
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                className="w-20 h-30"
              />
              <div>{book.title}</div> {/* Display the book title */}
            </Link>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string ,
  bookCovers: PropTypes.arrayOf(PropTypes.string),
};
BookShelf.defaultProps = {
  books: [], // Default to an empty array if books is not provided
};


export default BookShelf;
