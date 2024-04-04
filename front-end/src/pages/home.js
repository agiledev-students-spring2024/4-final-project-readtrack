import React from "react";
import { useNavigate } from "react-router-dom";
import appIcon from "../images/readIcon.png";

const Home = ({ loggedInUser }) => {
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div className={"appIcon"}>
          <img src={appIcon} alt="icon" className="w-20 h-20" />
        </div>
        <div className="text-goodreads-darkbrown">Welcome</div>
        <div className="text-2xl text-goodreads-brown">to readTrack!</div>
        <div className="mt-4"></div>
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
              className="btn"
              type="button"
              onClick={() => navigate("/login")}
              value="Log in"
            />
            <input
              className="btn"
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