// import { useEffect, useState } from "react";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// import friendsTest from "../data/friends.json";

// Dummy data
const friendsReading = [
  {
    id: 1,
    friendImage: "https://picsum.photos/150",
    friendName: "Alice",
    bookTitle: "The Great Gatsby",
    bookAuthor: "F. Scott Fitzgerald",
  },
  {
    id: 2,
    friendImage: "https://picsum.photos/150",
    friendName: "Bob",
    bookTitle: "1984",
    bookAuthor: "George Orwell",
  },
  {
    id: 3,
    friendImage: "https://picsum.photos/150",
    friendName: "Charlie",
    bookTitle: "To Kill a Mockingbird",
    bookAuthor: "Harper Lee",
  },

  // ... Add more dummy data as needed
];

const FriendShelf = ({ friendsList = friendsReading }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupFriendName, setPopupFriendName] = useState(null);

  const openPopup = (friend) => {
    setIsPopupOpen(true);
    setPopupFriendName(friend);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupFriendName(null);
  };

  return (
    <div className="flex space-x-4 overflow-x-auto p-4 bg-white shadow sm:rounded-lg my-4">
      {friendsList.map((friend) => (
        <div className="w-1/4 h-38">
          <div
            onClick={() => openPopup(friend)}
            key={friend.id}
            // className="flex items-center flex-col p-3 border border-gray-950"
            className="flex items-center flex-col pl-3 pr-3 pb-3"
          >
            <img
              src={friend.friendImage}
              alt={`Avatar of ${friend.friendName}`}
              className="w-full h-auto rounded-2xl"
            />
            {/* <div className="w-46 trunicate text-left"> */}
            <div className="w-full trunicate flex flex-col align items-start">
              <span className="line-clamp-1">
                <h3 className="text-s font-semibold w-full text-left trunicate">
                  {friend.friendName}
                </h3>
              </span>
              <span className="line-clamp-1">
                <p className=" text-xs w-full text-left">{friend.bookTitle}</p>
              </span>
            </div>
          </div>
        </div>
      ))}
      {isPopupOpen && (
        <div
          className="absolute m-0 top-0 left-0 right-0 h-full flex justify-center items-center backdrop-blur-lg backdrop-brightness-50"
          onClick={closePopup}
        >
          <div className="flex flex-col justify-center items-center rounded-2xl friendPreview z-10 top-24 left-1/6 flex w-5/6 h-3/5 bg-white fixed">
            <h1 className="font-cormorantGaramondMedium text-3xl text-gray-900">{`${popupFriendName.friendName}`}</h1>
            <p className=" font-cormorantGaramondMedium">
              {"is currently reading... "}
            </p>
            {/* include links to the friend's profile as well as to the book's page */}
            <img
              className="m-10"
              src={`http://localhost:3001/books/${popupFriendName.bookTitle}`}
              alt={`${popupFriendName.bookTitle}`}
            ></img>
            <h1 className="m-4 text-4xl font-medium text-gray-800 font-cormorantGaramondSemibold">{`${popupFriendName.bookTitle}`}</h1>
            <h1 className="text-2xl text-gray-600 font-cormorantGaramondMedium">{`${popupFriendName.bookAuthor}`}</h1>

            <div>
              <button
                className="border m-12 border-zinc-900 p-2 rounded-lg"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FriendShelf.propTypes = {
  friendsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      friendImage: PropTypes.string.isRequired,
      friendName: PropTypes.string.isRequired,
      bookTitle: PropTypes.string.isRequired,
      bookAuthor: PropTypes.string.isRequired,
    })
  ),
};

export default FriendShelf;
