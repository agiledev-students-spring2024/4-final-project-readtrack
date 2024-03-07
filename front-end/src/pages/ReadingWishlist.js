import React from "react"
// maybe the  button updates depending on whether the book has/ hasn't been added
// button to add a book to wishlist from that book's page
function UpdateReadingWishlist() {
  return (
    <div className="">
      {/* below button should store whether or not the current book has been added to wish list */}
      {/* const { bookAdded } = props */}
      <button>
        {/* take current book page this button is on and add to wish list */}
        <input className={'btn'} type="button" 
        onClick={() => {/* Add/ remove book from wishlist */}}  
        // / value={bookAdded ? 'Remove from wish list' : 'Add to wish list'}}
        value = {'Add to Wish List'} />
      </button>
    </div>
  );
};

const ReadingWishlist = () => {
  return (
    <div>
      <UpdateReadingWishlist />
    </div>
  );
};

export default ReadingWishlist;