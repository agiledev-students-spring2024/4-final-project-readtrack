import React from "react";
import PropTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <div className="flex flex-col items-start px-6 pt-8">
      <h1 className="text-4xl pb-0.5 text-goodreads-black font-cormorantGaramondSemibold">
        {title}
      </h1>
      <hr className="w-full border-t-2 border-goodreads-linegray" />
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
