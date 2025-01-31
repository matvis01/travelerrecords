import React, { useContext } from "react"
import styles from "./navBar.module.css"
import { useNavigate, useLocation } from "react-router-dom"
import { UserContext } from "../context/userContext"

export default function SideBar(props) {
  const { setUser } = useContext(UserContext)
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
      {/* {props.isTravel && (
        <button className={styles.withBg} onClick={props.setTravel}>
          Slide show
        </button>
      )} */}
      <button onClick={logout}>Log Out</button>
    </nav>
  )
}
