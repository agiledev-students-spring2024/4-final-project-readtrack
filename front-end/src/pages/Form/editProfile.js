import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = (props) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
        // firstName: props.currentUser.firstName || '',
        // lastName: props.currentUser.lastName || '',
        // email: props.currentUser.email || '',
        // other fields to edit
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateProfile(formData);
        navigate("/profile")
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
                            htmlFor="firstName"
                        >
                            First Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="lastName"
                        >
                            Last Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lastName"
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
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