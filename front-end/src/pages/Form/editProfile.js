import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ loggedInUser, setLoggedInUser }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
    });

    useEffect(() => {
        if (loggedInUser) {
            setFormData({
                fullname: loggedInUser.fullname || "",
                username: loggedInUser.username || "",
                email: loggedInUser.email || "",
            });
        }
    }, [loggedInUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/users/${loggedInUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                setLoggedInUser(data);
                navigate("/profile");
            })
            .catch((error) => console.error("Error updating profile:", error));
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4"
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
                            placeholder="John Doe"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="johndoe@example.com"
                            value={formData.email}
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
            </div>
        </div>
    );
};

export default EditProfile;
