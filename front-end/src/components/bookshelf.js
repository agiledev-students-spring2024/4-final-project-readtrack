import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BookShelf = ({ books, title }) => {
  const [bookImageLoaded, setBookImageLoaded] = useState({});

  const handleImageLoad = (bookId) => {
    setBookImageLoaded((prevState) => ({ ...prevState, [bookId]: true }));
  };
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
    <div className="flex flex-col text-left py-4 pl-4 justify-center w-full">
      <h2 className="pl-2 text-lg font-semibold pb-0 text-goodreads-black font-cormorantGaramondSemibold align-middle">
        {title}
      </h2>
      <div className="flex overflow-x-auto space-x-1 scrollbar-hide no-scrollbar pr-4">
        {books.length > 0 ? (
          books.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`} className="shrink-0">
              <div className="drop-shadow-md relative">
                {!bookImageLoaded[book.id] && (
                  <div className="w-28 h-44 rounded-sm p-2 bg-gray-200 animate-pulse absolute-inset"></div>
                )}
                <img
                  src={book.thumbnail || "https://via.placeholder.com/150x200?text=No+Cover"}
                  alt={`Cover of ${book.title}`}
                  className={`w-28 h-44 rounded-sm p-2 ${bookImageLoaded[book.id] ? "opacity-100" : "opacity-0"
                    }`}
                  onLoad={() => handleImageLoad(book.id)}
                />
              </div>
            </Link>
          ))
        ) : (
          dummyBooks.map((dummyBook) => (
            <Link key={dummyBook.id} to="/search" className="shrink-0">
              <div className="drop-shadow-md">
                <img
                  src={dummyBook.coverUrl}
                  alt={dummyBook.title}
                  className="w-28 h-44 rounded-sm p-2"
                />
              </div>
              <div>{dummyBook.title}</div>
            </Link>
          ))
        )}
      </div>
      <div className="w-full mx-auto pr-6 pl-2">
        <hr className="mt-2 border-t-0.5 border-goodreads-linegray" />
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
    })
  ),
};

BookShelf.defaultProps = {
  books: [],
};

export default BookShelf;
