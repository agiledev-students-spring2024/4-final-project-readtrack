import React, { useState } from "react";

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  const handleViewAll = (e) => {
    e.preventDefault();
    onSearch(""); // Assuming the backend treats empty string as 'fetch all'
  };

  return (
    <div className="flex justify-center items-center p-4 ">
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
            className="btn flex-1 min-w-[100px] px-4 py-2 text-white bg-teal-500 hover:bg-teal-700 transition-colors duration-150 ease-in-out"
            type="submit"
          >
            Search
          </button>
          <button
            className="btn flex-1 min-w-[100px] ml-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-150 ease-in-out"
            onClick={handleViewAll}
          >
            View All
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
