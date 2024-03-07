import React from 'react';
import Header from '../components/header';
import BookShelf from '../components/bookshelf';
import FriendShelf from '../components/FriendShelf';

const MainHome = (props) => {

    return (
        <div className="homepageLayout">
            
            <div >
                <Header title="Friends" />
                <FriendShelf />
                <div className="bookDividers"> personal  </div>
                <div className="bookDividers"> recommended </div>
                <div className="bookDividers"> friends </div>
                <div className="bookDividers"> top </div>
            </div>

        </div>



    )
}

export default MainHome