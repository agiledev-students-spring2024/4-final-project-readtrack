import React, { useState } from "react";

function CurrentlyReading({ userId, bookId, isAdded }) {
  // Initialize the bookAdded state based on the isAdded prop
  const [bookAdded, setBookAdded] = useState(isAdded);

  function UpdateCurrentlyReading() {
    const token = localStorage.getItem("token");
    const method = bookAdded ? "DELETE" : "POST";

    fetch(`http://localhost:3001/api/users/${userId}/currentlyReading`, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
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
    <button className="btn-sm" onClick={UpdateCurrentlyReading}>
      {bookAdded ? "Remove from Currently Reading" : "Add to Currently Reading"}
    </button>
  );
}

export default CurrentlyReading;
