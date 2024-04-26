import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchShelf = ({ books }) => {
    return (
        <div className="flex flex-col text-left py-4 pl-4 justify-center w-full">
            <div className="flex justify-start space-x-1 pr-4">
                {books.length > 0 ? (
                    books.map((book) => (
                        <Link key={book.id} to={`/books/${book.id}`} className="shrink-0">
                            <div className="drop-shadow-md">
                                <img
                                    src={book.thumbnail || "https://via.placeholder.com/150x200?text=No+Cover"}
                                    alt={`Cover of ${book.title}`}
                                    className="w-28 h-44 rounded-sm p-2"
                                />
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center">No books found. Please add some books.</div>
                )}
            </div>
            <div className="w-full mx-auto pr-6 pl-2">
                <hr className="mt-2 border-t-0.5 border-goodreads-linegray" />
            </div>
        </div>
    );
};

// for the books prop, we expect an array of objects, each with an id, title, and thumbnail
SearchShelf.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            thumbnail: PropTypes.string,
        })
    ),
};

export default SearchShelf;