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
            const token = localStorage.getItem("token");

            const urls = [
                `http://localhost:3001/api/users/${loggedInUser._id}/books/currentReads`,
                `http://localhost:3001/api/users/${loggedInUser._id}/books/friendsReads`,
                `http://localhost:3001/api/users/${loggedInUser._id}/books/topReads`,
                `http://localhost:3001/api/users/${loggedInUser._id}/books/suggestions`,
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
                            // Check if the HTTP request was successful
                            throw new Error("Network response was not ok");
                        }
                        return res.json(); // Parse JSON body of response
                    })
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