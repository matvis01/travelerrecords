import axios from "axios"
import React, { Component, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import style from "./loginStyle.module.css"

const api = axios.create({
  baseURL: "https://localhost:7263/api/Users",
})

export default function Login() {
  const [user, setUser] = useState({
    uesrName: "",
    password: "",
  })

  function setPassword(event) {
    setUser((prev) => {
      return { ...prev, password: event.target.value }
    })
  }

  function setUserName(event) {
    setUser((prev) => {
      return { ...prev, uesrName: event.target.value }
    })
  }

  let navigate = useNavigate()
  async function login() {
    try {
      await api.get(`/${user.uesrName}/${user.password}`)
      navigate("/home")
    } catch (err) {
      console.log(err)
      alert("user not found")
    }
  }
  return (
    <div className={style.loginBox}>
      <h1>Travel Records</h1>
      <input onChange={setUserName} placeholder="username" type="email"></input>
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
