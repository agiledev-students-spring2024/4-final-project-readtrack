import React, { useEffect, useState } from "react";
import Header from "../components/header";
import BookShelf from "../components/bookshelf";

const MainHome = ({ loggedInUser, setLoggedInUser }) => {
  const [currentReads, setCurrentReads] = useState([]);
  const [friendsReads, setFriendsReads] = useState([]);
  const [topReads, setTopReads] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const storedUserJSON = localStorage.getItem("loggedInUser");
    // localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    if (storedUserJSON && storedUserJSON !== "undefined" && !loggedInUser) {
      const storedUser = JSON.parse(storedUserJSON);
      setLoggedInUser(storedUser);
    }
  }, [loggedInUser]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!loggedInUser) return;

      const token = localStorage.getItem("token");
      const urls = [
        `https://readtrack-yi3cj.ondigitalocean.app/api/users/${loggedInUser._id}/books/currentReads`,
        `https://readtrack-yi3cj.ondigitalocean.app/api/users/${loggedInUser._id}/books/friendsReads`,
        `https://readtrack-yi3cj.ondigitalocean.app/api/users/${loggedInUser._id}/books/topReads`,
        `https://readtrack-yi3cj.ondigitalocean.app/api/users/${loggedInUser._id}/books/suggestions`,
      ];

      try {
        const allRequests = urls.map((url) =>
          fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
        );

        const [
          currentReadsRefs,
          friendsReadsRefs,
          topReadsRefs,
          suggestionsRefs,
        ] = await Promise.all(allRequests);

        // Fetch the full book details using the googleBookId
        const fetchBookDetails = async (bookRefs) => {
          const bookDetailsRequests = bookRefs.map((bookRef) =>
            fetch(`https://readtrack-yi3cj.ondigitalocean.app/api/books/${bookRef.id}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }).then((res) => res.json())
          );
          return Promise.all(bookDetailsRequests);
        };


        const [currentReads, friendsReads, topReads, suggestions] =
          await Promise.all([
            fetchBookDetails(currentReadsRefs),
            fetchBookDetails(friendsReadsRefs),
            fetchBookDetails(topReadsRefs),
            fetchBookDetails(suggestionsRefs),
          ]);

        // Update state with the fetched book details
        setCurrentReads(currentReads);
        setFriendsReads(friendsReads);
        setTopReads(topReads);
        setSuggestions(suggestions);

      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    if (loggedInUser) {
      fetchBooks();
    }
  }, [loggedInUser]);

  return (
    <div className="bg-goodreads-lightgray">
      {loggedInUser ? (
        <>
          {/* <Header title={`${loggedInUser.username}'s Homepage`} /> */}
          <Header title={`Home`} />

          <div>
            <BookShelf
              title="Current Reads"
              books={currentReads}
              subtitle="Your Rotation"
            />
            <div className="bg-goodreads-white">
              <BookShelf
                title="Friends Current Reads"
                books={friendsReads}
                subtitle="See what your friends are reading"
              />
            </div>
            <BookShelf
              title="This Week's Top 10 Reads"
              books={topReads}
              subtitle="See what's popular"
            />
            <div className="bg-goodreads-white">
              <BookShelf
                title="Suggestions for You"
                books={suggestions}
                subtitle="Based on your interests"
              />
            </div>
          </div>
        </>
      ) : (
        <div>Log in to view your bookshelves.</div>
      )}
    </div>
  );
};

export default MainHome;
