import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import BookShelf from '../components/bookshelf';

const MainHome = ({ loggedInUser }) => {
    const [currentReads, setCurrentReads] = useState([]);
    const [friendsReads, setFriendsReads] = useState([]);
    const [topReads, setTopReads] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    // console.log('Logged in user:', loggedInUser.loggedInUser);
    // console.log('Logged in user ID:', loggedInUser.loggedInUser?.id);

    useEffect(() => {
        // Define an async function to fetch books
        const fetchBooks = async () => {
            try {
                // Fetch Current Reads for the user
                const currentReadsResponse = await fetch(`http://localhost:3001/users/${loggedInUser.id}/books/CurrentReads`);
                const currentReadsData = await currentReadsResponse.json();
                setCurrentReads(currentReadsData);

                // Fetch Friends' Current Reads for the user
                const friendsReadsResponse = await fetch(`http://localhost:3001/users/${loggedInUser.id}/books/FriendsCurrentReads`);
                const friendsReadsData = await friendsReadsResponse.json();
                setFriendsReads(friendsReadsData);

                // Fetch This Week's Top 10 Reads
                const topReadsResponse = await fetch(`http://localhost:3001/users/${loggedInUser.id}/books/ThisWeek'sTop10Reads`);
                const topReadsData = await topReadsResponse.json();
                setTopReads(topReadsData);

                // Fetch Suggestions for the user
                const suggestionsResponse = await fetch(`http://localhost:3001/users/${loggedInUser.id}/books/SuggestionsforYou`);
                const suggestionsData = await suggestionsResponse.json();
                setSuggestions(suggestionsData);
                // Add other fetch calls
            } catch (error) {
                console.error("Error fetching book data:", error);
                // Handle errors as appropriate for your application
            }
        };

        // Call the async fetch function if loggedInUser exists
        if (loggedInUser) { // Ensure there's a current user ID before fetching
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