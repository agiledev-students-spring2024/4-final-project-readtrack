import React, { useState } from "react";

function ReadingWishlist() {
  const [bookAdded, setBookAdded] = useState(false);
  
  function UpdateWishList() {
    // add/ remove this book to the user's "Finished Reading Book List" update button display below
    setBookAdded(!bookAdded);
  }

  return (
    <button className="btn-sm" onClick={UpdateWishList}>
      {/* Add to Finished Books */}
      {bookAdded ? 'Remove from Wish List' : 'Add to Wish List'}
    </button>
  );
};

export default ReadingWishlist;