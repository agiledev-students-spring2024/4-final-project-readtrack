import React from "react";
import Header from "../components/header";
import FriendShelf from "../components/FriendShelf";

// do we want the hard-coded second line for demo or no?

const Friends = (props) => {
  return (
    <div className="displayFriends">
      <Header title="Friends List" />
      <div className="flex flex-col py-10 pl-2 justify-center bg-custom-gradient outline-4 outline-goodreads-darkbrown w-full">
        <FriendShelf title="first line of friends" />
        <div className="mt-5">
          <FriendShelf title="second line of friends" />
        </div>
      </div>
    </div>
  );
};

export default Friends;
