import React, { useState } from "react";

function CurrentlyReading({ userId, bookId }) {
  const [bookAdded, setBookAdded] = useState(false);

  function UpdateCurrentlyReading() {
    const token = localStorage.getItem("token");
    const url = `http://localhost:3001/api/users/${userId}/currentlyReading`;
    const method = bookAdded ? "DELETE" : "POST";
    setBookAdded(!bookAdded);
    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Failed to update currently reading list");
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
      {/* Add to Finished Books */}
      {bookAdded ? "Remove from Currently Reading" : "Add to Currently Reading"}
    </button>
  );
}

export default CurrentlyReading;
