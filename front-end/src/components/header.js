import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <div className="flex items-center justify-center bg-cyan-950 rounded-lg  px-4 py-8 ">
      <h1 className="text-2xl text-white font-bold">{title}</h1>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
