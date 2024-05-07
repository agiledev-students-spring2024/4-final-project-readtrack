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
  return (
    <div className="flex justify-center items-center bg-goodreads-lightgray">
      <form className=" mx-2 w-full max-w-sm" onSubmit={handleSearchSubmit}>
        <div className="flex items-center flex-col">
          <input
            className=" appearance-none m-1 bg-transparent border bg-white border-goodreads-lightgray w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none rounded-xl"
            type="text"
            placeholder="Search for books..."
            aria-label="Book search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* <div className="w-full text-left mt-4 mb-4">
            <button
              className="rounded-full font-cormorantGaramondMedium flex-1 min-w-[80px] px-4 py-1 border border-goodreads-linegray"
              type="submit"
            >
              Search
            </button>
            <button
              className="rounded-full font-cormorantGaramondMedium flex-1 min-w-[80px] ml-2 px-4 py-1 border border-goodreads-linegray"
              onClick={handleViewAll}
            >
              View All
            </button>
          </div> */}
          {/* <hr className="w-full border-t-2 border-goodreads-linegray" /> */}

          <hr className="w-full border-t-2 mt-4 mb-4 border-goodreads-linegray" />
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
