import React from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
