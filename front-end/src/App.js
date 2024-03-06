import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Navbar from "./components/navbar";
import SignUpPage from "./components/Form/SignUpPage";
import Login from './components/Form/login';
import MainHome from './components/mainHome';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

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
          <Route path="/mainHome" element={<MainHome />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
