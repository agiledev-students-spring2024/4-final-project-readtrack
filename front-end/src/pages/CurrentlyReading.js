import React, { useState } from "react";

function CurrentlyReading() {
  const [bookAdded, setBookAdded] = useState(false);
  
  function UpdateCurrentlyReading() {
    // add/ remove this book to the user's "Finished Reading Book List" update button display below
    setBookAdded(!bookAdded);
  }

  return (
    <button className="btn-sm" onClick={UpdateCurrentlyReading}>
      {/* Add to Finished Books */}
      {bookAdded ? 'Remove from Currently Reading' : 'Add to Currently Reading'}
    </button>
  );
};

export default CurrentlyReading;