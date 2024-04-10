import React from "react";
import { useNavigate } from "react-router-dom";
import appIcon from "../images/readIcon.png";

const Home = ({ loggedInUser }) => {
  const navigate = useNavigate();

  return (
    <div className="mainContainer bg-goodreads-white">
      <div className={"titleContainer"}>
        <div className={"appIcon"}>
          <img src={appIcon} alt="icon" className="w-20 h-20" />
          <div className="mt-8"></div>
        </div>
        <div className="text-goodreads-black font-pTSerifCaption font-thin">
          Welcome
        </div>
        <div className="text-2xl text-goodreads-black font-pTSerifCaption font-light">
          to ReadTrack!
        </div>
        <div className="mt-8"></div>
      </div>
      <div className="flex flex-col space-y-4">
        {loggedInUser ? (
          <input
            className="btn"
            type="button"
            onClick={() => navigate("/profile")}
            value="Profile"
          />
        ) : (
          <>
            <input
              className="homeBtn font-pTSerifCaption font-light" // fix the boldness
              type="button"
              onClick={() => navigate("/login")}
              value="Log in"
            />
            <input
              className="homeBtn font-pTSerifCaption font-light" // fix the boldness
              type="button"
              onClick={() => navigate("/signup")}
              value="Sign up"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
