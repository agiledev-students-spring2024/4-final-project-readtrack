import React, { useEffect, useState } from "react";
import Header from "../components/header";
import BookShelf from "../components/bookshelf";

const MainHome = () => {
  const [currentReads, setCurrentReads] = useState([]);
  const [friendsReads, setFriendsReads] = useState([]);
  const [topReads, setTopReads] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Retrieve the loggedInUser from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log("Logged in user:", loggedInUser);

  useEffect(() => {
    // Define an async function to fetch books
    const fetchBooks = async () => {
      const urls = [
        `http://localhost:3001/users/${loggedInUser.id}/books/CurrentReads`,
        `http://localhost:3001/users/${loggedInUser.id}/books/FriendsCurrentReads`,
        `http://localhost:3001/users/${loggedInUser.id}/books/ThisWeek'sTop10Reads`,
        `http://localhost:3001/users/${loggedInUser.id}/books/SuggestionsforYou`,
      ];

      try {
        // Map each URL to a fetch request and then pass all promises to Promise.all
        const allRequests = urls.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const [
          currentReadsData,
          friendsReadsData,
          topReadsData,
          suggestionsData,
        ] = await Promise.all(allRequests);

        // Update state with the fetched data
        setCurrentReads(currentReadsData);
        setFriendsReads(friendsReadsData);
        setTopReads(topReadsData);
        setSuggestions(suggestionsData);
        console.log("Current Reads:", currentReadsData[0]);
        

        
        // Handle additional data similarly
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    // Call the async fetch function
    if (loggedInUser) {
      // Ensure there's a current user ID before fetching
      fetchBooks();
    }
  }, []);
  

  return (
    <div className="bg-goodread-white">
      {loggedInUser ? (
        <>
          <Header title={`${loggedInUser.username}'s Homepage`} />
          <div>
            <BookShelf title="Current Reads" />
            <BookShelf title="Want to Read" />
            <BookShelf title="Past Reads" />
            <BookShelf title="Friends Current Reads" />
            <BookShelf title="This Week's Top 10 Reads" />
            <BookShelf title="Suggestions for You" />
          </div>
        </>
      ) : (
        <div>Log in to view your bookshelves.</div>
      )}
    </div>
  );
};

export default MainHome;
