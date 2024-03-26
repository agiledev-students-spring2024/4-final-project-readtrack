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
import BookSearchPage from "./pages/BookSearch";
import FriendShelf from "./components/FriendShelf";
import Friends from "./pages/Friends"
import Layout from "./components/Layout";
import Book from "./pages/Book";
import FriendProfile from "./pages/friendsProfile";

import ProfilePage from './pages/Form/profile'; // Import the ProfilePage component


function App() {


  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const onUpdateProfile = (updatedInfo) => {
    //update user profile here
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
        <Route path="/search" element={<Layout><BookSearchPage  /></Layout>} />
        <Route path="/mainHome" element={<Layout> <MainHome /> </Layout>} />
        <Route path="/edit-profile" element={<Layout> <EditProfile onUpdateProfile={onUpdateProfile} /> </Layout>} />
        <Route path="/profile" element={<Layout> <ProfilePage /> </Layout>} />
        <Route path="/friend-shelf" element={<Layout> <FriendShelf /> </Layout>} />
        <Route path="/friends" element={<Layout> <Friends /> </Layout>} />
        <Route path="/title-by-author" element={<Layout> <Book /> </Layout>} />
        <Route path="/friend-profile" element={<Layout> <FriendProfile /> </Layout>} />
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
