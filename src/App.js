import React from "react"
import Login from "./pages/login/login"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/home/homePage"
import Register from "./pages/login/register"
import Profile from "./pages/profile/profile"
import TravelPage from "./pages/travelPage/travelPage"
import SlideShow from "./pages/travelPage/components/slideShow"

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/travel/:id" element={<TravelPage />} />
    </Routes>
  )
}

export default App
