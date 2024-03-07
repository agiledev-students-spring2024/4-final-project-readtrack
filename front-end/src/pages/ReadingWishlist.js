import react from "react"

function AddReadingWishlist() {
  return (
    <button>
      Add to wish list
    </button>
  );
};

// option to remove book from reading list quickly
function RemoveReadingWishlist() {
  return (
    <button>
      Remove from wish list
    </button>

  );
};

const ReadingWishlist = () => {
  return (
    <div>
      <AddReadingWishlist />
      <RemoveReadingWishlist />
    </div>


  );
};

export default ReadingWishlist;