import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookShelf from "../../components/bookshelf";

const ProfilePage = ({ loggedInUser, setLoggedInUser }) => {
    const [profile, setProfile] = useState(null);
    const [currentReads, setCurrentReads] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [pastReads, setPastReads] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const placeholder = "https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    useEffect(() => {
        if (loggedInUser) {
            const token = localStorage.getItem('token');
            if (!token) {
                // Token not found, redirect to login page
                navigate('/login');
                return;
            }

            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/users/${loggedInUser.id}`, {
                        headers: {
                            Authorization: token,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setProfile(data);
                    } else {
                        console.error('Error fetching user profile:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            };

            const fetchBooks = async (endpoint, setBooks) => {
                try {
                    const response = await fetch(`http://localhost:3001/api/users/${loggedInUser.id}/books/${endpoint}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setBooks(data);
                    } else {
                        console.error(`Error fetching ${endpoint}:`, response.status);
                    }
                } catch (error) {
                    console.error(`Error fetching ${endpoint}:`, error);
                }
            };

            fetchUserProfile();
            fetchBooks('WanttoRead', setWantToRead);
            fetchBooks('PastReads', setPastReads);
            fetchBooks('favorites', setFavorites);
        }
    }, [loggedInUser, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("token");
        setLoggedInUser(null);
        navigate("/");
    };

    if (!profile) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="text-xl">Loading...</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src={placeholder}
                            alt="Profile"
                            className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 mr-4"
                        />
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {profile.fullname}
                            </h3>
                            <p className="text-sm text-gray-500">@{profile.username}</p>
                            <p className="text-sm font-semibold text-gray-700 mt-1">{profile.friendCount} Friends</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <Link
                            to="/edit-profile"
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-2"
                        >
                            Edit Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Log out
                        </button>
                    </div>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Bio
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.bio || "This user prefers to keep an air of mystery about them."}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="mt-5 space-y-4">
                <BookShelf title="Favorites" books={favorites} />
                <BookShelf title="Want to Read" books={wantToRead} />
                <BookShelf title="Past Reads" books={pastReads} />
            </div>
        </div>
    );
};

export default ProfilePage;
