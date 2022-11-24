import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import style from "./loginStyle.module.css"

export default function Login() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  function setPassword(event) {
    setUser((prev) => {
      return { ...prev, password: event.target.value }
    })
  }

  function setEmail(event) {
    setUser((prev) => {
      return { ...prev, email: event.target.value }
    })
  }
  function setName(event) {
    setUser((prev) => {
      return { ...prev, name: event.target.value }
    })
  }
  function setConfirmPassword(event) {
    setUser((prev) => {
      return { ...prev, confirmPassword: event.target.value }
    })
  }

  let navigate = useNavigate()
  function register() {
    if (user.password !== user.confirmPassword) {
      alert("Password doesn't match")
      setUser((prev) => {
        return { ...prev, password: "", confirmPassword: "" }
      })
      return
    }
    console.log(user)
    navigate("/home")
  }

  return (
    <div className={style.loginBox}>
      <h1>Travel Records</h1>
      <input onChange={setName} placeholder="name"></input>
      <input onChange={setEmail} placeholder="email" type="email"></input>
      <input
        onChange={setPassword}
        placeholder="password"
        type="password"
        value={user.password}
      ></input>
      <input
        onChange={setConfirmPassword}
        placeholder="confirm password"
        type="password"
        value={user.confirmPassword}
      ></input>
      <button onClick={register}>register</button>
      <div className={style.loginBoxText}>
        <Link to="/login">login</Link>
      </div>
    </div>
  )
}
