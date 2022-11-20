import React, { useEffect, useState } from "react";
import Login from "./pages/login/login";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/homePage";
import Register from "./pages/login/register";
import "./pages/login/loginStyle.css";

function App() {
  return (
    <div className="bg">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
