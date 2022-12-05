import React from "react"
import Login from "./pages/login/login"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/home/homePage"
import Register from "./pages/login/register"

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
