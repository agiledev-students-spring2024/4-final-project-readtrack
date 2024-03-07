function UpdateFinishedBookList() {
  return (
    <div className="">
      {/* below button should store whether or not the current book has been added to finished book list */}
      {/* const { bookAdded } = props */}
      <button>
        {/* take current book page this button is on and add/ remove from finished list */}
        <input className={'btn'} type="button" 
        onClick={() => {/* Add/ remove book from finished list */}}  
        // / value={bookAdded ? 'Remove from finished books' : 'Add to finished books'}}
        value = {'Add to Finished Book List'} />
      </button>
    </div>
  );
};

const ReadingFinished = () => {
  return (
    <div className="">
      <UpdateFinishedBookList />
    </div>
  );
};

export default ReadingFinished;
