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
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  function NavbarWithLocation() {
    const location = useLocation();
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/signup"
    ) {
      return null;
    }
    return <Navbar />;
  }

  function AppRoutes() {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home loggedInUser={loggedInUser} />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login setLoggedInUser={setLoggedInUser} />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUpPage
                setLoggedInUser={setLoggedInUser}
                loggedInUser={loggedInUser}
              />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <BookSearchPage />
            </Layout>
          }
        />
        <Route
          path="/mainHome"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Layout>
                <MainHome loggedInUser={loggedInUser} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Layout>
                {" "}
                <EditProfile
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />{" "}
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
        <NavbarWithLocation />
      </BrowserRouter>
    </div>
  );
}

export default App;
