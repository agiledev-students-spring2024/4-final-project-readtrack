import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookShelf from "../../components/bookshelf";

const ProfilePage = ({ loggedInUser, setLoggedInUser }) => {
    const [profile, setProfile] = useState(null);
    const [currentReads, setCurrentReads] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [pastReads, setPastReads] = useState([]);
    const navigate = useNavigate();
    const placeholder =
        "https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    useEffect(() => {
        console.log("profile user: " + loggedInUser);
        if (loggedInUser) {
            fetch(`http://localhost:3001/users/${loggedInUser.id}`)
                .then((response) => response.json())
                .then((data) => {
                    setProfile(data);
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                });

            // Fetch current reads books
            fetch(`http://localhost:3001/users/${loggedInUser.id}/books/currentReads`)
                .then((response) => response.json())
                .then((data) => {
                    setCurrentReads(data);
                })
                .catch((error) => {
                    console.error("Error fetching current reads:", error);
                });

            // Fetch want to read books
            fetch(`http://localhost:3001/users/${loggedInUser.id}/books/WanttoRead`)
                .then((response) => response.json())
                .then((data) => {
                    setWantToRead(data);
                })
                .catch((error) => {
                    console.error("Error fetching want to read:", error);
                });

            // Fetch past reads books
            fetch(`http://localhost:3001/users/${loggedInUser.id}/books/PastReads`)
                .then((response) => response.json())
                .then((data) => {
                    setPastReads(data);
                })
                .catch((error) => {
                    console.error("Error fetching past reads:", error);
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
        <div className="w-screen">
            {/* PROFILE HEADER */}
            <div className="flex flex-col px-4 my-10">
                <div className="flex flex-row mb-4 justify-between">
                    <img
                        src={placeholder}
                        alt="Profile"
                        className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                    />
                    <div className="flex flex-col justify-center">
                        <div className="text-md">{profile.fullname}</div>
                        <div className="text-xs">@{profile.username}</div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="pt-1">
                            <Link
                                to="/edit-profile"
                                className="text-xs tracking-tight text-center inline-block w-full bg-goodreads-gray hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-sm transition duration-100 ease-in-out"
                            >
                                Edit Profile
                            </Link>
                        </div>
                        <div className=" text-sm py-1">
                            <p>{profile.friendCount} Friends</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-xs tracking-tight text-center inline-block w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-sm transition duration-100 ease-in-out mt-2"
                        >
                            Log out
                        </button>
                    </div>
                </div>
                {/* Profile Bio */}
                <div className="flex flex-row px-6 py-4 text-left">
                    <div className="text-sm">
                        <b>Bio</b>: {profile.bio}
                    </div>
                </div>
            </div>
            {/* PROFILE BODY */}
            <div>
                <BookShelf title="Favorites" books={pastReads} />
                {/* <BookShelf title="Current Reads" books={currentReads} /> repeat from the homepage*/}
                <BookShelf title="Want to Read" books={wantToRead} />
                <BookShelf title="Past Reads" books={pastReads} />
            </div>
        </div>
    );
};

export default ProfilePage;
