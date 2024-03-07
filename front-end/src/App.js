import "./App.css";
import './index.css';

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./pages/navbar";
import SignUpPage from "./pages/Form/SignUpPage";
import Login from './pages/Form/login';
import EditProfile from './pages/Form/editProfile';
import MainHome from './pages/mainHome';
import ReadingFinished from "./pages/ReadingFinished";
import ReadingProgress from "./pages/ReadingProgress";
import ReadingWishlist from "./pages/ReadingWishlist";
import CurrentlyReading from "./pages/CurrentlyReading";
import BookSearch from "./pages/BookSearch";

import ProfilePage from './pages/Form/profile'; // Import the ProfilePage component


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const onUpdateProfile = (updatedInfo) => {
    //update user profile here
  };

  const handleBookSearch = (searchTerm) => {
    // call API to search for books
    console.log(`Search for: ${searchTerm}`);
    // update state with search results here once we have backend
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search" element={<BookSearch onSearch={handleBookSearch} />} />
          <Route path="/mainHome" element={<MainHome />} />
          <Route path="/edit-profile" element={<EditProfile onUpdateProfile={onUpdateProfile} />} />
          <Route path="/profile" element={<ProfilePage />} /> {/* Add the route for the ProfilePage */}
        </Routes>
        {loggedIn && <Navbar />} {/* render Navbar based on loggedIn state */}
      </BrowserRouter>
    </div>
  );
}

export default App;