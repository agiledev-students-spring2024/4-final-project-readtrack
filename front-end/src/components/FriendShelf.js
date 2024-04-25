// import { useEffect, useState } from "react";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Dummy data
const friendsReading = [
  {
    id: 1,
    friendImage: "https://picsum.photos/150",
    friendName: "Alice",
    bookTitle: "The Great Gatsby",
    bookAuthor: "F. Scott Fitzgerald",
    bookCover: "https://via.placeholder.com/150x200?text=Add+Books",
  },
  {
    id: 2,
    friendImage: "https://picsum.photos/150",
    friendName: "Bob",
    bookTitle: "1984",
    bookAuthor: "George Orwell",
    bookCover: "https://via.placeholder.com/150x200?text=Add+Books",
  },
  {
    id: 3,
    friendImage: "https://picsum.photos/150",
    friendName: "Charlie",
    bookTitle: "To Kill a Mockingbird",
    bookAuthor: "Harper Lee",
    bookCover: "https://via.placeholder.com/150x200?text=Add+Books",
  },
  {
    id: 4,
    friendImage: "https://picsum.photos/150",
    friendName: "Dunkin",
    bookTitle: "Donutes 101",
    bookAuthor: "Andy Hamilton",
    bookCover: "https://via.placeholder.com/150x200?text=Add+Books",
  },
  {
    id: 5,
    friendImage: "https://picsum.photos/150",
    friendName: "Sasha",
    bookTitle: "Eloquent Javascript",
    bookAuthor: "Marijn Haverbeke",
    bookCover: "https://via.placeholder.com/150x200?text=Add+Books",
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
    <div className="flex align-middle flex-wrap p-0">
      {friendsList.map((friend) => (
        <div key={friend.id} className="w-1/3 h-38 mb-2">
          <div
            onClick={() => openPopup(friend)}
            key={friend.id}
            className="flex items-center flex-col pl-3 pr-3 pb-3"
          >
            <img
              src={friend.friendImage}
              alt={`Avatar of ${friend.friendName}`}
              className="w-full h-auto rounded-2xl"
            />
            <div className="w-full trunicate flex flex-col align items-start mt-1">
              <span className="line-clamp-1">
                <h3 className="text-s font-semibold w-full text-left trunicate">
                  {friend.friendName}
                </h3>
              </span>
              <span className="line-clamp-1">
                <p className="text-s w-full text-left">{friend.bookTitle}</p>
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
          <div className="flex flex-col justify-center items-center rounded-2xl friendPreview z-10 top-20 left-1/6 w-5/6 h-4/6 bg-white fixed mt-6 mb-6">
            <h1 className="font-cormorantGaramondMedium text-gray-900 text-4xl font-extrabold">{`${popupFriendName.friendName}`}</h1>
            <p className="font-cormorantGaramondMedium text-gray-900 text-2xl">
              {"is currently reading"}
            </p>
            {/* include links to the friend's profile as well as to the book's page */}
            <div className="m-10 ">
              <Link to="/search">
                <img
                  className="drop-shadow-xl"
                  src={popupFriendName.bookCover}
                  alt={`${popupFriendName.bookTitle}`}
                ></img>
              </Link>
            </div>
            <h1 className="font-cormorantGaramondSemibold text-gray-900 text-3xl font-bold">{`${popupFriendName.bookTitle}`}</h1>
            <h1 className="font-cormorantGaramondMedium text-gray-900 text-2xl">{`${popupFriendName.bookAuthor}`}</h1>

            <div></div>
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
