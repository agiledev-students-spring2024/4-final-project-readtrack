import React, { useState } from "react";

function ReadingFinished() {
  const [bookAdded, setBookAdded] = useState(false);
  
  function UpdateFinishedReading() {
    // add/ remove this book to the user's "Finished Reading Book List" update button display below
    setBookAdded(!bookAdded);
  }

  return (
    <button className="btn-sm" onClick={UpdateFinishedReading}>
      {/* Add to Finished Books */}
      {bookAdded ? 'Remove from Finished Books' : 'Add to Finished Books'}
    </button>
  );
};

export default ReadingFinished;