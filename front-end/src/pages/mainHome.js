import React from 'react';
import Header from '../components/header';
import BookShelf from '../components/bookshelf';

const MainHome = ({ loggedInUser }) => {
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