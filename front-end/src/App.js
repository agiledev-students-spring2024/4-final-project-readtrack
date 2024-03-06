import "./App.css";
import './index.css';

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Navbar from "./components/navbar";
import SignUpPage from "./components/Form/SignUpPage";
import Login from './components/Form/login'
import ReadingFinished from "./components/ReadingFinished";
import ReadingProgress from "./components/ReadingProgress";
import ReadingWishlist from "./components/ReadingWishlist";
import CurrentlyReading from "./components/CurrentlyReading";
import BookSearch from "./components/BookSearch";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const handleBookSearch = (searchTerm) => {
    // call API to search for books
    console.log(`Search for: ${searchTerm}`);
    // update state with search results here once we have backend
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search" element={<BookSearch onSearch={handleBookSearch} />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
