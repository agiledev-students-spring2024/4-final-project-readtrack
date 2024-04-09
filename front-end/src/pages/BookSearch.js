// BookSearch.js
import React from "react";
import Header from "../components/header";
import { useEffect, useState } from "react";
import SearchComponent from "../components/SearchComponent"; // Adjust the import path as necessary
import BookShelf from "../components/bookshelf";

// TODO: Render books on screen
// TODO: Clicking on book, go to that book's page
// TODO: Finish search stuff
// Understand Ellis' search component
const BookSearchPage = ({ loggedInUser, setLoggedInUser, onSearch }) => { 

  const [profile, setProfile] = useState(null);
  const [topReads, setTopReadss] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      fetch(`http://localhost:3001/users/${loggedInUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [loggedInUser]);


  const fetchTopReads = () => {
    const url = `http://localhost:3001/users/${loggedInUser.id}/books/ThisWeek'sTop10Reads`;
    try {
      const topReadsData = fetch(url).then((res) => res.json());
      setTopReadss(topReadsData)
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  
  
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
    
    <div>
      <Header title="Search" />
      
      <SearchComponent onSearch={handleSearch} />
      {searchPerformed ? (
        <BookShelf title="Search Results" books={books} />
      ) : (
        // before search displays top books
        <BookShelf title="Top Books" books={topReads} /> 
      )}
      
    </div>
    
  );
};

export default BookSearchPage;
