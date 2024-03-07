import React, { useState } from 'react';
const BookSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form className="w-full max-w-sm" onSubmit={handleSearchSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search for books..."
            aria-label="Book search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className="btn"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookSearch;
