import React from "react"
// maybe the  button updates depending on whether the book has/ hasn't been added
// button to add a book to currentlyReading from that book's page
function AddCurrentlyReading() {
  return (
    <button>
      Add to reading list
    </button>
  );
};

// option to remove book from reading list quickly
function RemoveCurrentlyReading() {
  return (
    <button>
      Remove from reading list
    </button>

  );
};

const CurrentlyReading = () => {
  return (
    <div className="">
      <AddCurrentlyReading />
      <RemoveCurrentlyReading />
    </div>
  );
};

export default CurrentlyReading;
