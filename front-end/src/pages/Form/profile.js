import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Profile</h1>
                <div className="mb-4">
                    <p className="text-lg text-gray-600"><span className="font-semibold">Name:</span> John Doe</p>
                    <p className="text-lg text-gray-600"><span className="font-semibold">Email:</span> john.doe@example.com</p>
                </div>
                <Link
                    to="/edit-profile"
                    className="inline-block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    Edit Profile
                </Link>
            </div>
        </div>
    );
};

export default ProfilePage;
