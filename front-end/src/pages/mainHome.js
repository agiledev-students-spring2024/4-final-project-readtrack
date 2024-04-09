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

    // console.log(localStorage.getItem("loggedInUser"));
    // console.log(localStorage.getItem("token"));

    useEffect(() => {
        const storedUserJSON = localStorage.getItem("loggedInUser");
        // localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        if (storedUserJSON && storedUserJSON !== "undefined" && !loggedInUser) {
            const storedUser = JSON.parse(storedUserJSON);
            setLoggedInUser(storedUser);
        }
    }, [loggedInUser]);


    // console.log("Logged in user:", loggedInUser);

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
        <div className="bg-goodread-white">
            {loggedInUser ? (
                <>
                    <Header title={`${loggedInUser.username}'s Homepage`} />
                    <div>
                        <BookShelf title="Current Reads" books={currentReads} />
                        {/* <BookShelf title="Want to Read" books={wantToRead} /> moved to profile */}
                        {/* <BookShelf title="Past Reads" books={pastReads} /> moved to profile */}
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
