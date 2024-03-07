import React from "react"

function ReadingStatusBar() {
  return (
// box containing info
<div className="progressContainer">
{/* info about progress inclding percent finished and text */}
    <div className="statusText">
      {/* dummy number */}
      <p>Currently 50% Finished</p>
    </div>
    <div className="statusBar"> {/* this will be a box that is slowly filled from rihgt to left with blue */}
      <div className="barShell"> {/* the percent filled by progress color needs to be page number / total page numbers * 100 */}
        <div className="barFill"></div>
      </div>
    </div>
  </div>
  );
  
};

// button to edit reading progress (enter page number)
function UpdateReadingStatus() {
  return (
    <button className="btn" value={"update progress"}>
      {/* enter page number */}
    </button>
  );
};

const ReadingProgress = () => {
  return (
    // container
    <div className="">
      {/* // update status */}
      <UpdateReadingStatus />

      {/* // status bar */}
      <ReadingStatusBar />
    
    </div>
  );
};

export default ReadingProgress;
