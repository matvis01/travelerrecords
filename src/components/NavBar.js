import React, { useEffect, useState, useContext } from "react"
import styles from "./navBar.module.css"
import { useNavigate, useLocation } from "react-router-dom"
import blankPicture from "../assets/blankProfile.png"
import { UserContext } from "../context/userContext"

export default function SideBar(props) {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  let { pathname } = location

  function logout() {
    setUser(null)
    localStorage.setItem("token", "")
    navigate("/")
  }
  return (
    <nav className={styles.navBar}>
      {/* <img src={user.image ? user.image : blankPicture} /> */}
      {/* <h1 className={styles.name}>{user.username}</h1> */}
      <button
        className={pathname === "/home" ? styles.withBg : styles.xd}
        onClick={() => {
          navigate("/home")
        }}
      >
        Home
      </button>
      <button
        className={pathname === "/profile" ? styles.withBg : styles.xd}
        onClick={() => {
          navigate("/profile")
        }}
      >
        Profile
      </button>
      <button onClick={logout}>Log Out</button>
    </nav>
  )
}
