import React from "react";
import PropTypes from "prop-types";

const SearchHeader = ({ title }) => {
  return (
    <div className="flex flex-col items-start px-6 pt-8 pb-2 pl-4 bg-goodreads-lightgray">
      <h1 className="text-4xl text-goodreads-black font-cormorantGaramondSemibold">
        {title}
      </h1>
      {/* <hr className="w-full border-t-2 border-goodreads-lightgray" /> */}
    </div>
  );
};

SearchHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchHeader;
