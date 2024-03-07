import React from "react"
// maybe the  button updates depending on whether the book has/ hasn't been added
// button to add a book to currentlyReading from that book's page
function UpdateCurrentlyReading() {
  return (
    <div className="">
      {/* below button should store whether or not the current book has been added to currentlyreading */}
      {/* const { bookAdded } = props */}
      <button>
        {/* take current book page this button is on and add to currently reading reading list */}
        <input className={'btn'} type="button" 
        onClick={() => {/* Add book to currently reading or remove */}}  
        // / value={bookAdded ? 'Remove from Currently Reading' : 'Add to Currently Reading'}}
        value = {'Add to Currently Reading'} />
      </button>
    </div>
  );
};

const CurrentlyReading = () => {
  return (
    <div className="">
      <UpdateCurrentlyReading />
    </div>
  );
};

export default CurrentlyReading;
