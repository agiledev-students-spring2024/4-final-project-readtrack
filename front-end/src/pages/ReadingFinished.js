import react from "react"

function AddReadingFinished() {
  return (
    <button>
      Add to finished book list
    </button>
  );
};

// option to remove book from reading list quickly
function RemoveReadingFinished() {
  return (
    <button>
      Remove from finished book list
    </button>

  );
};

const ReadingFinished = () => {
  return (
    <div className="">
      <AddReadingFinished />
      <RemoveReadingFinished />
    </div>
  );
};

export default ReadingFinished;