import React from 'react';
import Header from '../components/header';
import BookShelf from '../components/bookshelf';


const MainHome = (props) => {

    return (
        <div className="bg-goodread-white">
            <div >
                <Header title="User's Homepage" />
                <BookShelf title="Current Reads" />
                <BookShelf title="Friends Current Reads" />
                <BookShelf title="This Week's Top 10 Reads" />
                <BookShelf title="Suggestions for You" />
            </div>

        </div>

    )
}

export default MainHome