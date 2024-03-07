import React from 'react';
import Header from '../components/header';
import BookShelf from '../components/bookshelf';

const MainHome = (props) => {

    return (
        <div className="homepageLayout">
            
            <div >
                <Header title="Friends" />
                <BookShelf title="Currently Reading" />
                <div className="bookDividers"> personal  </div>
                <div className="bookDividers"> recommended </div>
                <div className="bookDividers"> friends </div>
                <div className="bookDividers"> top </div>
            </div>

        </div>



    )
}

export default MainHome