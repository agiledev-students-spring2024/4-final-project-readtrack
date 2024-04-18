import React, { useEffect, useState } from "react";

function ReadingWishlist({ userId, bookId, isAdded }) {
  const [bookAdded, setBookAdded] = useState(isAdded || false);

  useEffect(() => {
    setBookAdded(isAdded);
  }, [isAdded]);

  function UpdateWishList() {
    const token = localStorage.getItem("token");
    const method = bookAdded ? "DELETE" : "POST";

    fetch(`http://localhost:3001/api/users/${userId}/wishlist`, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update currently reading list");
        }
        return response.json();
      })
      .then(() => {
        setBookAdded(!bookAdded);
      })
      .catch((error) => {
        console.error("Error updating currently reading list:", error);
      });
  }

  return (
    <div>
      {bookAdded ? (
        <button className="btn-sm-2" onClick={UpdateWishList}>
          Remove from Wishlist
        </button>
      ) : (
        <button className="btn-sm-1" onClick={UpdateWishList}>
          Add to Wishlist
        </button>
      )}
    </div>
  );
};

export default ReadingWishlist;