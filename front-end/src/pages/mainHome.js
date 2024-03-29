import React, { useEffect, useState } from "react";
import Header from "../components/header";
import BookShelf from "../components/bookshelf";

const MainHome = () => {
  const [currentReads, setCurrentReads] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [pastReads, setPastReads] = useState([]);
  const [friendsReads, setFriendsReads] = useState([]);
  const [topReads, setTopReads] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Retrieve the loggedInUser from localStorage
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(storedUser);
  }, []);
  console.log("Logged in user:", loggedInUser);

  useEffect(() => {
    // Define an async function to fetch books
    const fetchBooks = async () => {
      if (!loggedInUser) return; // return early if loggedInUser -> null

      const urls = [
        `http://localhost:3001/users/${loggedInUser.id}/books/currentReads`,
        `http://localhost:3001/users/${loggedInUser.id}/books/WanttoRead`,
        `http://localhost:3001/users/${loggedInUser.id}/books/PastReads`,
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
          wantToRead,
          pastReads,
          friendsReadsData,
          topReadsData,
          suggestionsData,
        ] = await Promise.all(allRequests);

        // Update state with the fetched data
        setCurrentReads(currentReadsData);
        setWantToRead(wantToRead);
        setPastReads(pastReads);
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
  }, [loggedInUser]);


  return (
    <div className="bg-goodread-white">
      {loggedInUser ? (
        <>
          <Header title={`${loggedInUser.username}'s Homepage`} />
          <div>
            <BookShelf title="Current Reads" books={currentReads} />
            <BookShelf title="Want to Read" books={wantToRead} />
            <BookShelf title="Past Reads" books={pastReads} />
            <BookShelf title="Friends Current Reads" books={friendsReads} />
            <BookShelf title="This Week's Top 10 Reads" books={topReads} />
            <BookShelf title="Suggestions for You" books={suggestions} />
          </div>
        </>
      ) : (
        <div>Log in to view your bookshelves.</div>
      )}
    </div>
  );
};

export default MainHome;
