import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookShelf from "../../components/bookshelf";

const ProfilePage = ({ loggedInUser, setLoggedInUser }) => {
  const [profile, setProfile] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [pastReads, setPastReads] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const placeholder = "https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const token = localStorage.getItem('token');
      if (!token) {
        // Token not found, redirect to login page
        navigate('/login');
        return;
      }

      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`https://readtrack-yi3cj.ondigitalocean.app/api/users/${loggedInUser._id}`, {
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
          const response = await fetch(`https://readtrack-yi3cj.ondigitalocean.app/api/users/${loggedInUser._id}/books/${endpoint}`, {
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
      fetchBooks('wishlist', setWishlist);
      fetchBooks('pastReads', setPastReads);
    }
  }, [loggedInUser, navigate]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white container mx-auto">
      <div className="block text-left pt-4 pl-4 pr-4 pb-2">
        <h2 className="pt-5 text-4xl/[40px] tracking-wide pb-2 text-goodreads-black font-cormorantGaramondSemibold font-semibold">
          {profile.username}
        </h2>
      </div>
      <div className="sm:px-10 flex-nowrap pl-4 pr-4">
        <div className="flex items-start">
          <div>
            <img
              src={placeholder}
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 mr-4"
            />
          </div>

          <div className="ml-3 pt-1">
            <p className="px-8 text-lg text-gray-700 mt-1 font-semibold font-cormorantGaramondSemibold">
              {/* {profile.booksRead} */}0
            </p>
            <p className="px-8 text-gray-700 font-cormorantGaramondMedium">
              Books Read
            </p>
          </div>

          <div className="pt-1">
            <p className="px-8 text-lg text-gray-700 mt-1 font-semibold font-cormorantGaramondSemibold">
              {/* {profile.friendCount} */}0
            </p>
            <p className="px-8 text-gray-700 font-cormorantGaramondMedium">
              {" "}
              Friends
            </p>
          </div>
        </div>

        <div>
          <dl>
            <div>
              <p className="pt-2 text-goodreads-black font-cormorantGaramondSemibold text-left">
                {profile.fullname}
              </p>
            </div>
            <div>
              <dd className="text-sm text-gray-900 text-left sm:mt-0 sm:col-span-2 font-cormorantGaramondMedium mb-1.5">
                {" "}
                {profile.bio}{" "}
              </dd>
            </div>
          </dl>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/edit-profile"
            className="text-sm text-goodreads-black font-cormorantGaramondSemibold bg-goodreads-white rounded-xl mb-2 border border-goodreads-black px-3"
          >
            Edit Profile
          </Link>
        </div>
        <hr className="w-full border-t-2 border-goodreads-linegray" />
      </div>

      <div className="mt-5 space-y-4">
        <div className="bg-goodreads-lightgray">
          <BookShelf className="" title="Favorites" books={favorites} />
        </div>
        <BookShelf className="" title="Wishlist" books={wishlist} />
        <div className="bg-goodreads-lightgray">
          <BookShelf className="" title="Past Reads" books={pastReads} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

