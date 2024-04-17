// BookSearch.js
import React from "react";
// import SearchHeader from "../components/searchHeader";

import Header from "../components/header";
import { useEffect, useState } from "react";
import SearchComponent from "../components/SearchComponent"; // Adjust the import path as necessary
import BookShelf from "../components/bookshelf";

// Dummy data lives: in books in back-end app.js

//!! READD LOGGEDINUSER

// TODO: Render books on screen
// TODO: Clicking on book, go to that book's page
// TODO: Finish search stuff
// Understand Ellis' search component
const BookSearchPage = ({ loggedInUser, setLoggedInUser,  onSearch }) => {

  const [profile, setProfile] = useState(null);
  const [topReads, setTopReads] = useState([]);
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
      setTopReads(topReadsData)
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  useEffect(() => {
    fetchTopReads();
  }, [loggedInUser]);

  
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
      {searchPerformed ? (
        // ok so use the search handling thing to get the books that have that in the title
        <BookShelf title="Search Results" books={books} />
      ) : (
        // before search displays top books
        <BookShelf title="Top Books" books={topReads} /> 
      )}
      
    </div>
    
  );
};

export default BookSearchPage;