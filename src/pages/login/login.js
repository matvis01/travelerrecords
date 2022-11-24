import React, { Component, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import style from "./loginStyle.module.css"

export default function Login() {
  const [user, setUser] = useState({
    name: "m",
    email: "",
    password: "",
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

  let navigate = useNavigate()
  function login() {
    navigate("/home")
  }
  return (
    <div className={style.loginBox}>
      <h1>Travel Records</h1>
      <input onChange={setEmail} placeholder="email" type="email"></input>
      <input
        onChange={setPassword}
        placeholder="password"
        type="password"
      ></input>
      <button onClick={login}>login</button>
      <div className={style.loginBoxText}>
        <p>dont have an account? </p>
        <div>
          <Link to="/register">register</Link>
        </div>
      </div>
    </div>
  )
}
