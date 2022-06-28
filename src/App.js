import React from "react"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"
import Profile from "./components/Profile/Profile"
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from "./AuthContext"
import { Navbar } from "./components/Navbar"

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;