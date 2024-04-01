import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../pages/navbar";

const Layout = ({ children, loggedInUser }) => {
  const location = useLocation();

  const showNavbar =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup";
    

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="mb-16 flex-grow overflow-auto">{children}</div>
      {showNavbar && (
        <div>
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default Layout;
