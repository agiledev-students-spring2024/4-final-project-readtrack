import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookShelf from "../../components/bookshelf";

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        name: "Loading...",
        username: "loading...",
        friendCount: 0,
        bio: "Loading bio...",
    });
    // const placeholder = "https://via.placeholder.com/100";
    const placeholder = "https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    // simulate fetching data
    useEffect(() => {
        // fetch data from backend here
        // simulating an async data fetch with setTimeout
        const fetchData = async () => {
            // simulate delay - for fun 
            setTimeout(() => {
                setProfile({
                    name: "John Doe",
                    username: "johndoe",
                    friendCount: 3,
                    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero atque tempora quam",
                });
            }, 500);
        };

        fetchData();
    }, []);

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
                        <div className="text-md">{profile.name}</div>
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
                <BookShelf title="Current Reads" />
                <BookShelf title="Want to Read" />
                <BookShelf title="Past Reads" />
            </div>
        </div>
    );
};

export default ProfilePage;