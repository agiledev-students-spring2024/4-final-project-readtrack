import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../pages/navbar";

const Layout = ({ children }) => {
  const location = useLocation();

  const showNavbar =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup";

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="mb-16">{children}</div>
      {/* the mb-16 formatting needs to be removed from the home page because it is causing a white space at the bottom of the page */}
      {showNavbar && (
        <div>
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default Layout;
