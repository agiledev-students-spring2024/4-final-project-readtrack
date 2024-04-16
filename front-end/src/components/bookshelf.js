import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BookShelf = ({ books, title }) => {
  const dummyBooks = [
    {
      id: "dummy1",
      coverUrl: "https://via.placeholder.com/150x200?text=Add+Books",
    },
    {
      id: "dummy2",
      coverUrl: "https://via.placeholder.com/150x200?text=Add+Books",
    },
    {
      id: "dummy3",
      coverUrl: "https://via.placeholder.com/150x200?text=Add+Books",
    },
    {
      id: "dummy4",
      coverUrl: "https://via.placeholder.com/150x200?text=Add+Books",
    },
    {
      id: "dummy5",
      coverUrl: "https://via.placeholder.com/150x200?text=Add+Books",
    },
    {
      id: "dummy6",
      coverUrl: "https://via.placeholder.com/150x200?text=Add+Books",
    },
  ];

  return (
    <div className="flex flex-col text-left py-4 pl-4 justify-center bg-custom-gradient w-full my-1">
      <h2 className="text-l text-white align-middle font-semibold py-1">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide pr-4">
        {books.length > 0 ? (
          books.map((book) => (
            <Link key={book._id} to={`/books/${book._id}`} className="shrink-0">
              <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="w-28 h-44" />
            </Link>
          ))
        ) : (
          dummyBooks.map((dummyBook) => (
            <Link key={dummyBook.id} to="/search" className="shrink-0">
              <img src={dummyBook.coverUrl} alt={dummyBook.title} className="w-28 h-44" />
              <div>{dummyBook.title}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string,
  bookCovers: PropTypes.arrayOf(PropTypes.string),
};

BookShelf.defaultProps = {
  books: [],
};

export default BookShelf;