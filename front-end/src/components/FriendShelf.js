// import { useEffect, useState } from "react";

import React from "react";
import PropTypes from "prop-types";

// import friendsTest from "../data/friends.json";

// Dummy data
const friendsReading = [
  {
    id: 1,
    // friendImage: 'https://via.placeholder.com/150',
    friendImage: "https://picsum.photos/150",
    friendName: "Alice",
    bookTitle: "The Great Gatsby",
    bookAuthor: "F. Scott Fitzgerald",
  },
  {
    id: 2,
    // friendImage: 'https://via.placeholder.com/150',
    friendImage: "https://picsum.photos/150",
    friendName: "Bob",
    bookTitle: "1984",
    bookAuthor: "George Orwell",
  },
  {
    id: 3,
    // friendImage: 'https://via.placeholder.com/150',
    friendImage: "https://picsum.photos/150",
    friendName: "Charlie",
    bookTitle: "To Kill a Mockingbird",
    bookAuthor: "Harper Lee",
  },

  // ... Add more dummy data as needed
];

const FriendShelf = ({ friendsList = friendsReading }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto p-4 bg-white shadow sm:rounded-lg my-4">
      {friendsList.map((friend) => (
        <div
          key={friend.id}
          className="min-w-max flex-shrink-0 flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-lg transition duration-200 ease-in-out"
        >
          <img
            src={friend.friendImage}
            alt={`Avatar of ${friend.friendName}`}
            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow"
          />
          <h3 className="text-md font-semibold text-gray-900">{friend.friendName}</h3>
          <p className="text-sm font-medium text-gray-800">{friend.bookTitle}</p>
          <p className="text-xs text-gray-600">{friend.bookAuthor}</p>
        </div>
      ))}
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

// const FriendShelfContainer = () => {
//   const [friendsList, setFriendsList] = useState([]);

//   useEffect(() => {
//     // Fetch data from JSON file
//     fetch("../data/friends.json")
//       .then((response) => response.json())
//       .then((data) => setFriendsList(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return <FriendShelf friendsList={friendsList} />;
// };

export default FriendShelf;
