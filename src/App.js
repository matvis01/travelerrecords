import React, { useEffect, useState } from "react"
import Login from "./pages/login/login"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/home/homePage"
import Register from "./pages/login/register"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
