import React, { useEffect, useState } from "react"
import styles from "./sidebar.module.css"
import { useNavigate } from "react-router-dom"
import blankPicture from "../pictures/blankProfile.png"

export default function SideBar(props) {
  const navigate = useNavigate()

  function logout() {
    navigate("/")
  }
  return (
    <nav className={styles.sideBar}>
      <img src={blankPicture} />
      <h1 className={styles.name}>Name Surname</h1>
      <button>Edit Profile</button>
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
