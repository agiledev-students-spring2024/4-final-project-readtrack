import React, { useEffect, useState } from "react";
import Header from "../components/header";
import BookShelf from "../components/bookshelf";

const MainHome = ({ loggedInUser, setLoggedInUser }) => {
    const [currentReads, setCurrentReads] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [pastReads, setPastReads] = useState([]);
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
            if (!loggedInUser) return; // Return early if loggedInUser is null

            // Retrieve the token from local storage
            const token = localStorage.getItem('token');

            const urls = [
                `http://localhost:3001/users/${loggedInUser.id}/books/currentReads`,
                `http://localhost:3001/users/${loggedInUser.id}/books/WanttoRead`,
                `http://localhost:3001/users/${loggedInUser.id}/books/PastReads`,
                `http://localhost:3001/users/${loggedInUser.id}/books/FriendsCurrentReads`,
                `http://localhost:3001/users/${loggedInUser.id}/books/ThisWeek'sTop10Reads`,
                `http://localhost:3001/users/${loggedInUser.id}/books/SuggestionsforYou`,
            ];

            try {
                const allRequests = urls.map((url) =>
                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    }).then((res) => res.json())
                );

                const [
                    currentReadsData,
                    wantToReadData,
                    pastReadsData,
                    friendsReadsData,
                    topReadsData,
                    suggestionsData,
                ] = await Promise.all(allRequests);

                // Update state with the fetched data
                setCurrentReads(currentReadsData);
                setWantToRead(wantToReadData);
                setPastReads(pastReadsData);
                setFriendsReads(friendsReadsData);
                setTopReads(topReadsData);
                setSuggestions(suggestionsData);
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
                    <Header title={`${loggedInUser.username}'s Homepage`} />
                    <div>

                        <BookShelf title="Current Reads" books={currentReads} />
                        <div className="bg-goodreads-white">
                            <BookShelf title="Friends Current Reads" books={friendsReads} />
                        </div>
                        <BookShelf title="This Week's Top 10 Reads" books={topReads} />
                        <div className="bg-goodreads-white">
                            <BookShelf title="Suggestions for You" books={suggestions} />
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
