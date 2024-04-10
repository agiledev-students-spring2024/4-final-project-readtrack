import React, { useState, useEffect } from "react";
import Header from "../components/header";
import FriendShelf from "../components/FriendShelf";
import { useNavigate } from "react-router-dom";

// const Friends = (props) => {
const Friends = ({ loggedInUser, setLoggedInUser }) => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loggedInUser) {
      fetch(`http://localhost:3001/users/${loggedInUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [loggedInUser]);

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate("/");
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="displayFriends">
      <Header title={`${profile.fullname}'s Friend List`} />
      <div className="flex min-h-screen  flex-col bg-custom-gradient outline-4 outline-goodreads-darkbrown w-full">
        <FriendShelf />
      </div>
    </div>
  );
};

export default Friends;
