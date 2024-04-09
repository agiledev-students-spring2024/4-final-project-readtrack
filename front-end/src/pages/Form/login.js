import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ registeredUser, setLoggedInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        email,
        password,
      });
      const { user, token } = response.data;
      localStorage.setItem("loggedInUser", JSON.stringify(user.id));
      localStorage.setItem('token', token); // store token in local storage

      setLoggedInUser(user);
      navigate('/mainHome');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid email or password');
      } else {
        setLoginError('An error occurred during login');
      }
    }
  };

  return (
    <div className='bg-goodreads-white flex flex-col items-center justify-center h-lvh'>
      <div className='flex flex-col text-[64px] font-bold items-center justify-center'>
        <div>Login</div>
      </div>
      <br />
      {loginError && <div className="errorLabel">{loginError}</div>}
      {<div className="errorLabel">{registeredUser}</div>}
      <div className='flex flex-col items-start justify-center'>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className='border border-gray-600 h-[48px] w-[300px] text-lg rounded-lg pl-2'
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className='flex flex-col items-start justify-center'>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className='border border-gray-600 h-[48px] w-[300px] text-lg rounded-lg pl-2'
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className='flex flex-col items-start justify-center'>
        <button className='border border-gray-600 bg-[rgba(51,_51,_51,_0.05)] hover:bg-[rgba(51,_51,_51,_0.2)] rounded-[8px] cursor-pointer text-[18px] font-medium leading-[20px] px-[20px] py-[10px] text-center' onClick={handleLogin}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;