import React from 'react';


const MainHome = (props) => {

    return (
        <div className="homepageLayout">
            <div className="bander"> User's Homepage</div>
            <div className="bookContainer">
                <div className="bookDividers"> personal  </div>
                <div className="bookDividers"> recommended </div>
                <div className="bookDividers"> friends </div>
                <div className="bookDividers"> top 10 </div>
            </div>

        </div>



    )
}

export default MainHome