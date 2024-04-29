import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const EditProfile = ({ loggedInUser, setLoggedInUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    if (loggedInUser) {
      setFormData({
        fullname: loggedInUser.fullname || "",
        username: loggedInUser.username || "",
        email: loggedInUser.email || "",
        bio: loggedInUser.bio || "",
      });
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setLoggedInUser(null);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/update/${loggedInUser._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const { user } = await response.json();
        setLoggedInUser(user);
        navigate("/profile");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-goodreads-lightgray flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              name="fullname"
              placeholder="John Doe"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              name="username"
              placeholder="JohnDoe"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="bio">
              Bio
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="bio"
              type="bio"
              name="bio"
              placeholder="Tell us about yourself."
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
          </div>
        </form>
        <button
          onClick={handleLogout}
          className="text-sm text-goodreads-black font-cormorantGaramondSemibold bg-goodreads-lightgray rounded-md mb-2 border border-goodreads-black px-3"
        >
          Log Out
        </button>

        <div>
          <Link
            to="/profile"
            className="text-sm text-goodreads-black font-cormorantGaramondSemibold bg-goodreads-lightgray rounded-md mb-2 border border-goodreads-black px-3"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
