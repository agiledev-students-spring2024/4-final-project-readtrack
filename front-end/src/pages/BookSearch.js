import React, { useState, useEffect } from "react";
import SearchHeader from "../components/searchHeader";
import SearchShelf from "../components/SearchShelf";
import SearchComponent from "../components/SearchComponent";

const BookSearchPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = () => {
    const apiUrl = `http://localhost:3001/api/books`;
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    fetch(apiUrl, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch books due to authorization or server error');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          throw new Error("Data received is not an array");
        }
      })
      .catch((error) => {
        console.error("Error loading the books:", error);
      });
  };

  const handleSearch = (searchTerm) => {
    const searchUrl = `http://localhost:3001/api/books/search?query=${encodeURIComponent(searchTerm)}`;
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    fetch(searchUrl, { headers })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Failed to retrieve search results", error);
      });
  };

  // Function to split books array into chunks of 3, ensuring the last chunk is not empty
  const chunkBooks = (books, chunkSize) => {
    let result = [];
    for (let i = 0; i < books.length; i += chunkSize) {
      let chunk = books.slice(i, i + chunkSize);
      // If the chunk is less than the chunkSize, it's the last chunk and should be added as is
      if (chunk.length < chunkSize) {
        result.push(chunk);
      } else {
        result.push(chunk);
      }
    }
    return result;
  };

  const bookChunks = chunkBooks(books, 3);

  return (
    <div className="bg-goodreads-lightgray">
      <SearchHeader title="Search" />
      <SearchComponent onSearch={handleSearch} />
      {bookChunks.map((chunk, index) => (
        <SearchShelf key={index} books={chunk} />
      ))}
    </div>
  );
};

export default BookSearchPage;
