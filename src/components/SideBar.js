import React, { useEffect, useState, useContext } from "react"
import styles from "./sidebar.module.css"
import { useNavigate } from "react-router-dom"
import blankPicture from "../assets/blankProfile.png"
import { UserContext } from "../context/userContext"

export default function SideBar(props) {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  console.log(user)
  function logout() {
    setUser(null)
    navigate("/")
  }
  return (
    <nav className={styles.sideBar}>
      <img src={user.image ? user.image : blankPicture} />
      <h1 className={styles.name}>{user.username}</h1>
      <button
        onClick={() => {
          navigate("/profile")
        }}
      >
        Edit Profile
      </button>
      <button
        onClick={() => {
          navigate("/home")
        }}
      >
        My Journeys
      </button>
      <button onClick={logout}>Log Out</button>
    </nav>
  )
}
