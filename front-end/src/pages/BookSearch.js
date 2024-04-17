// BookSearch.js
import React from "react";
// import SearchHeader from "../components/searchHeader";

import Header from "../components/header";
import { useState } from "react";
import SearchComponent from "../components/SearchComponent"; // Adjust the import path as necessary
import BookShelf from "../components/bookshelf";
// TODO: Render books on screen
const BookSearchPage = ({ onSearch }) => {
  const [books, setBooks] = useState([]);

  const handleSearch = (searchTerm) => {

    // Call the API to search for books 
    const searchUrl = `http://localhost:3001/api/books/search?query=${encodeURIComponent(searchTerm)}`;
      fetch(searchUrl)
      .then((response) => {
        if(!response.ok) {
          throw new Error('Failed to retrieve search results');
        }
        return response.json();
      })
      .then((data) => {
       setBooks(data)

      });
      console.log(books)
      
    
  };

  return (
    <div className=" ">
      {/* <SearchHeader */}
      <Header
        className="font-cormorantGaramondSemibold text-goodreads-black"
        title={`Search`}
      />
      <SearchComponent onSearch={handleSearch} />
      <BookShelf title="Search Results" books={books} />
    </div>
  );
};

export default BookSearchPage;
