import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = ({ setLoggedInUser, loggedInUser, setRegisteredUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setLoggedInUser(data.user); // Update loggedInUser state with the user object
        setRegisteredUser("Please login to continue.");
        navigate('/mainHome');
      })
      .catch(error => {
        console.error('Error registering user:', error);
        // Display an error message to the user
        alert('Error registering user. Please try again.');
      });
  };

  // redirect to profile page if user is already logged in
  if (loggedInUser) {
    navigate('/profile');
    return null;
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-8 py-6 mt-4 text-left bg-white">
        <h3 className="text-2xl font-bold text-center">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 ">
            <div className='mb-4'>
              <label className="block" htmlFor="fullname">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={handleChange}
                className="w-full px-2 py-2 mt-2 border rounded-md"
                value={formData.fullname}
              />
            </div>
            <div className='mb-4'>
              <label className="block" htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                className="w-full px-2 py-2 mt-2 border rounded-md"
                value={formData.username}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                className="w-full px-2 py-2 mt-2 border rounded-md"
                value={formData.email}
              />
            </div>
            <div className="mt-4 mb-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="w-full px-2 py-2 mt-2 border rounded-md"
                value={formData.password}
              />
            </div>
            <div className="flex items-baseline justify-between">
              {/* made the button blue, if this goes against our theme we can revert i guess */}
              <button className=" bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:shadow-outline">
                Sign Up
              </button>
              <a href="/login" className="text-blue-600 hover:underline pl-2">
                Already have an account? Login
              </a>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;