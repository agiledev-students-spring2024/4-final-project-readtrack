import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookShelf from "../../components/bookshelf";

const ProfilePage = ({ loggedInUser, setLoggedInUser }) => {
    const [profile, setProfile] = useState(null);
    const [wantToRead, setWantToRead] = useState([]);
    const [pastReads, setPastReads] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const placeholder = "https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    useEffect(() => {
        console.log("loggedInUser.id: ", loggedInUser._id)
        if (loggedInUser) {
            const token = localStorage.getItem('token');
            if (!token) {
                // Token not found, redirect to login page
                navigate('/login');
                return;
            }

            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/users/${loggedInUser._id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
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
                    const response = await fetch(`http://localhost:3001/api/users/${loggedInUser._id}/books/${endpoint}`, {
                        method: 'GET',
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
            fetchBooks('favorites', setFavorites);
            fetchBooks('wantToRead', setWantToRead);
            fetchBooks('pastReads', setPastReads);
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
        <div className="bg-white container mx-auto p-4">


            <div className="block text-left">
                <h2 className="pt-5 text-4xl/[40px] tracking-wide pb-2 text-goodreads-black font-cormorantGaramondSemibold">
                    {profile.username}</h2>
            </div>
            <div className="sm:px-10 flex-nowrap">
                <div className="flex items-center">
                    <div>
                        <img
                            src={placeholder}
                            alt="Profile"
                            className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 mr-4"
                        />
                        <p className="pt-3 pr-12 text-lg text-goodreads-black font-cormorantGaramondSemibold">{profile.fullname}</p>
                    </div>
                    <div>
                        <p className="px-8 text-sm text-gray-500">Books Read</p>
                    </div>
                    <div>
                        <p className="px-8 text-sm font-semibold text-gray-700 mt-1">{profile.friendCount}</p>
                        <p className="px-8 text-sm font-semibold text-gray-700 mt-1"> Friends</p>
                    </div>
                </div>
                <div>
                    <dl>
                        <div>
                            <dd className="pr-8 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.bio || "This user prefers to keep an air of mystery about them."}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="pt-2 flex justify-end">
                    <div>
                        <Link
                            to="/edit-profile"
                            className="text-sm text-goodreads-black font-cormorantGaramondSemibold rounded-md mb-2 border border-[#000000] px-3"
                        >
                            Edit Profile
                        </Link>
                    </div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-goodreads-black font-cormorantGaramondSemibold rounded-md mb-2 border border-[#000000] px-3"
                        >
                            Log out
                        </button>
                    </div>
                </div>
                <hr className="w-full border-t-2 border-goodreads-linegray" />
            </div>


            <div className="mt-5 space-y-4">

                <div className="bg-goodreads-lightgray">
                    <BookShelf title="Favorites" books={favorites} />
                </div>
                <BookShelf title="Wishlist" books={wantToRead} />
                <div className="bg-goodreads-lightgray">
                    <BookShelf title="Past Reads" books={pastReads} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
