import React, { useEffect, useState } from "react";

function ReadingFinished({ userId, bookId, isAdded }) {
  const [bookAdded, setBookAdded] = useState(isAdded || false);

  useEffect(() => {
    setBookAdded(isAdded);
  }, [isAdded]);

  function UpdateFinishedReading() {
    const token = localStorage.getItem("token");
    const method = bookAdded ? "DELETE" : "POST";

    fetch(`http://localhost:3001/api/users/${userId}/finishedReading`, {
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
        <button className="btn-sm-2" onClick={UpdateFinishedReading}>
          Remove from Finished Reading
        </button>
      ) : (
        <button className="btn-sm-1" onClick={UpdateFinishedReading}>
          Add to Finished Reading
        </button>
      )}
    </div>
  );
};

export default ReadingFinished;