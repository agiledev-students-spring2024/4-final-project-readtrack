import React from 'react';
import Header from '../components/header';
import BookShelf from '../components/bookshelf';
import FriendShelf from '../components/FriendShelf';


const MainHome = (props) => {

    return (
        <div className="bg-goodread-white" >
            <Header title="User's Homepage" />
            {/* <FriendShelf /> */}
            <BookShelf title="Current Reads" />
            <BookShelf title="Friends Current Reads" />
            <BookShelf title="This Week's Top 10 Reads" />
            <BookShelf title="Suggestions for You" />
        </div>
    )
}

export default MainHome