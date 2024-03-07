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
    <button className="btn-sm">
      Update Progress
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

// import React, { useState } from "react";

// function ReadingStatusBar({ currentPage, totalPages }) {
//   const percentage = (currentPage / totalPages) * 100;

//   return (
//     <div className="progressContainer">
//       <div className="statusText">
//         <p>Currently {Math.round(percentage)}% Finisheds</p>
//       </div>
//       <div className="statusBar">
//         <div className="barShell" style={{ width: '100%', backgroundColor: '#ddd' }}>
//           <div className="barFill" style={{ width: `${percentage}%`, backgroundColor: 'blue', height: '20px' }}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const UpdateReadingStatus = ({ currentPage, setCurrentPage }) => {
//   return (
//     <div>
//       <input type="number" value={currentPage} onChange={(e) => setCurrentPage(e.target.value)}
//       className="pageInput"
//       placeHolder="Enter page number"/>
//       <button className="btn" onClick={() => {}}>Update Progress</button>
//     </div>
//   );
// };

// const ReadingProgress = () => {
//   const [currentPage, setCurrentPage] = useState(0);
// const totalPages = 360; // dummy value. should represent num pages on current book

//   return (
//     <div className="">
//       <UpdateReadingStatus currentPage={currentPage} setCurrentPage={setCurrentPage} />
//       <ReadingStatusBar currentPage={currentPage} totalPages={totalPages} />
//     </div>
//   );
// };

// export default ReadingProgress;