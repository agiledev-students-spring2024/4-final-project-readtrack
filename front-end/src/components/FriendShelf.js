import React from 'react';
import PropTypes from 'prop-types';

// Dummy data
const friendsReading = [
  {
    id: 1,
    // friendImage: 'https://via.placeholder.com/150',
    friendImage: 'https://picsum.photos/150',
    friendName: 'Alice',
    bookTitle: 'The Great Gatsby',
    bookAuthor: 'F. Scott Fitzgerald',
  },
  {
    id: 2,
    // friendImage: 'https://via.placeholder.com/150',
    friendImage: 'https://picsum.photos/150',
    friendName: 'Bob',
    bookTitle: '1984',
    bookAuthor: 'George Orwell',
  },
  {
    id: 3,
    // friendImage: 'https://via.placeholder.com/150',
    friendImage: 'https://picsum.photos/150',
    friendName: 'Charlie',
    bookTitle: 'To Kill a Mockingbird',
    bookAuthor: 'Harper Lee',
  },

  // ... Add more dummy data as needed
];

const FriendShelf = ({ friendsList = friendsReading }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto justify-center">
      {friendsList.map((friend) => (
        <div key={friend.id} className="flex flex-col items-center space-y-2 border-2 border-gray-200 rounded-lg">
          <img
            src={friend.friendImage}
            alt={`Avatar of ${friend.friendName}`}
            className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
          />
          <h3 className="text-lg font-semibold">{friend.friendName}</h3>
          <p className="text-sm">{friend.bookTitle}</p>
          <p className="text-sm text-gray-600">{friend.bookAuthor}</p>
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

export default FriendShelf;
