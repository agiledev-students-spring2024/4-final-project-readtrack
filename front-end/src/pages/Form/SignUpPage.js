import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = (props) => {
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
    fetch('http://localhost:3001/users/register', {
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
        console.log("response: ", response);
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log('User registered:', data);
        props.setLoggedInUser(data); // update loggedInUser state in App.js
        navigate('/mainHome');
      })
      .catch(error => console.error('Error registering user:', error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-8 py-6 mt-4 text-left bg-white">
        <h3 className="text-2xl font-bold text-center">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="fullname">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md"
                value={formData.fullname}
              />
            </div>
            <div>
              <label className="block" htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md"
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
                className="w-full px-4 py-2 mt-2 border rounded-md"
                value={formData.email}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md"
                value={formData.password}
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="btn">Sign Up</button>
              <a href="/login" className="text-sm text-blue-600 hover:underline">
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