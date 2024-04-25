import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

// base URL for all Axios requests
axios.defaults.baseURL = 'http://localhost:3001/api';

// using interceptor to attach the token to every request
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}