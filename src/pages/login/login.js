import axios from "axios"
import React, { Component, useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import style from "./loginStyle.module.css"
import { UserContext } from "../../context/userContext"

import api from "../../api/api"

export default function Login() {
  const { user, setUser } = useContext(UserContext)

  function setPassword(event) {
    setUser((prev) => {
      return { ...prev, password: event.target.value }
    })
  }

  function setUserName(event) {
    setUser((prev) => {
      return { ...prev, username: event.target.value }
    })
  }

  let navigate = useNavigate()
  async function login() {
    try {
      const res = await api.get(`/Users/${user.username}/${user.password}`)
      setUser(res.data)
      navigate("/home")
    } catch (err) {
      console.log(err)
      alert("user not found")
    }
  }
  return (
    <div className={style.loginPage}>
      <div className={style.loginBox}>
        <h1>Travel Records</h1>
        <input
          onChange={setUserName}
          placeholder="username"
          type="email"
        ></input>
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
    </div>
  )
}
