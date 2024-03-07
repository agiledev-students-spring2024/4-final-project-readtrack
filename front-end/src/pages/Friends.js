import React from 'react';
import Header from '../components/header';
import FriendShelf from '../components/FriendShelf';

const Friends = (props) => {

    return (
        <div className="ispFriendsList">
            <div>
            <Header title="Friends List" />
                <h1></h1>
                <FriendShelf title="first line" />
            </div>
        </div> 
    )
}

export default Friends