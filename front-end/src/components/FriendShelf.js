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
        <div
          onClick={() => openPopup(friend)}
          key={friend.id}
          className="w-40 flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-lg transition duration-200 ease-in-out"
        >
          <img
            src={friend.friendImage}
            alt={`Avatar of ${friend.friendName}`}
            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow"
          />
          <h3 className="text-md font-semibold text-gray-900 truncate">
            {friend.friendName}
          </h3>
          <p className="text-sm font-medium text-gray-800 truncate">
            {friend.bookTitle}
          </p>
          <p className="text-xs text-gray-600 truncate">{friend.bookAuthor}</p>
        </div>
      ))}
      {isPopupOpen && (
        <div className="absolute m-0 top-0 left-0 right-0 h-full flex justify-center items-center backdrop-blur-sm">
          <div className="flex flex-col justify-center items-center rounded-lg friendPreview z-10 top-14 left-1/6 flex w-4/6 h-4/5 bg-white fixed">
            <h1 className="font-semibold text-3xl text-gray-900">{`${popupFriendName.friendName} is reading...`}</h1>
            {/* include links to the friend's profile as well as to the book's page */}
            <img
              className="m-10"
              src={`http://localhost:3001/books/${popupFriendName.bookTitle}`}
              alt={`${popupFriendName.bookTitle}`}
            ></img>
            <h1 className="m-4 text-4xl font-medium text-gray-800">{`${popupFriendName.bookTitle}`}</h1>
            <h1 className="text-2xl text-gray-600">{`${popupFriendName.bookAuthor}`}</h1>

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
