import "./App.css";

import "./index.css";

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./pages/navbar";
import SignUpPage from "./pages/Form/SignUpPage";
import Login from "./pages/Form/login";
import EditProfile from "./pages/Form/editProfile";
import MainHome from "./pages/mainHome";
import ReadingFinished from "./pages/ReadingFinished";
import ReadingProgress from "./pages/ReadingProgress";
import ReadingWishlist from "./pages/ReadingWishlist";
import CurrentlyReading from "./pages/CurrentlyReading";
import BookSearchPage from "./pages/BookSearch";
import FriendShelf from "./components/FriendShelf";
import Friends from "./pages/Friends";
import Layout from "./components/Layout";
import BookPage from "./pages/Book";
import FriendProfile from "./pages/friendsProfile";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./pages/Form/profile";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);  // Initialize to null or a default object
  const [registeredUser, setRegisteredUser] = useState(null);

  useEffect(() => {
    // Optionally initialize loggedInUser from local storage or an API call
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Update localStorage when loggedInUser changes
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }, [loggedInUser]);


  function AppRoutes() {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login
                setLoggedInUser={setLoggedInUser}
                registeredUser={registeredUser}
              />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUpPage
                setRegisteredUser={setRegisteredUser}
                setLoggedInUser={setLoggedInUser}
                loggedInUser={loggedInUser}
              />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Layout>
                <BookSearchPage loggedInUser={loggedInUser} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mainHome"
          element={

            <ProtectedRoute loggedInUser={loggedInUser}>
              <Layout>
                <MainHome loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Layout>
                <ProfilePage
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Layout>
                <EditProfile
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/friend-shelf"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Layout>
                <FriendShelf />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Layout>
                <Friends loggedInUser={loggedInUser} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/title-by-author"
          element={
            <Layout>
              {" "}
              <BookPage />{" "}
            </Layout>
          }
        />
        <Route
          path="/books/:bookId"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Layout>
                <BookPage loggedInUser={loggedInUser} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/friend-profile"
          element={
            <Layout>
              {" "}
              <FriendProfile />{" "}
            </Layout>
          }
        />
      </Routes>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes loggedInUser={loggedInUser} />
      </BrowserRouter>
    </div>
  );
}

export default App;
