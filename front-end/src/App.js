import "./App.css";
import './index.css';

import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import FriendShelf from "./components/FriendShelf";
import Layout from "./components/Layout";

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

  function NavbarWithLocation() {
    const location = useLocation();
    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
      return null;
    }
    return <Navbar />;
  }

  function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Layout><Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></Layout>} />
        <Route path="/login" element={<Layout><Login setLoggedIn={setLoggedIn} setEmail={setEmail} /></Layout>} />
        <Route path="/signup" element={<Layout><SignUpPage /></Layout>} />
        <Route path="/search" element={<Layout><BookSearch onSearch={handleBookSearch} /></Layout>} />
        <Route path="/mainHome" element={<Layout> <MainHome /> </Layout>} />
        <Route path="/edit-profile" element={<Layout> <EditProfile onUpdateProfile={onUpdateProfile} /> </Layout>} />
        <Route path="/profile" element={<Layout> <ProfilePage /> </Layout>} />
        <Route path="/friend-shelf" element={<Layout> <FriendShelf /> </Layout>} />
      </Routes>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
        <NavbarWithLocation />
      </BrowserRouter>
    </div>
  );
}

export default App;
