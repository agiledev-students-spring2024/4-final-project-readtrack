// BookSearch.js
import React from "react";
import SearchComponent from "../components/SearchComponent"; // Adjust the import path as necessary
import BookShelf from "../components/bookshelf";
// TODO: Render books on screen
const BookSearchPage = ({ onSearch }) => {
  return (
    <div className=" ">
      <SearchComponent onSearch={onSearch} />



      
    </div>
  );
};

export default BookSearchPage;
