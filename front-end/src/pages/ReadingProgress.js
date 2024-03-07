import React from "react"

// button to edit reading progress (enter page number)
function UpdateReadingStatus() {
  return (
    <button>
      Update progress
    </button>
  );
};

function ReadingStatusBar() {
  return (
    // status bar that displays how much of book currently read
    // current page/total pages * 100
    <>
    </>
  );
};

const ReadingProgress = () => {
  return (
    // container
    <div className="">
      // update status
      <div className="">
        <UpdateReadingStatus/>
      </div>


      // status bar
      <div className="">
        <ReadingStatusBar/>
      </div>
    
    </div>
  );
};

export default ReadingProgress;

