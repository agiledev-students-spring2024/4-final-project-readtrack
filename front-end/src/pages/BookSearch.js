// BookSearch.js
import React from "react";
import { useState } from "react";
import SearchComponent from "../components/SearchComponent"; // Adjust the import path as necessary
import BookShelf from "../components/bookshelf";
// TODO: Render books on screen
const BookSearchPage = ({ onSearch }) => {
  const [books, setBooks] = useState([]);
  
  const handleSearch = (searchTerm) => {

    
    // Call the API to search for books
    const searchUrl =`http://localhost:3001/books/${searchTerm}`;
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
       setBooks(data)

      });
      console.log(books)
      
    
  };
  

  return (
    
    <div className=" ">
      
      <SearchComponent onSearch={handleSearch} />
      <BookShelf title="Search Results" books={books} /> 
      




      
    </div>
  );
};

export default BookSearchPage;
