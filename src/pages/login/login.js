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
  async function login(e) {
    await e.preventDefault()
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
      <form className={style.loginBox} onSubmit={login}>
        <h1>Travel Records</h1>
        <input
          onChange={setUserName}
          placeholder="username"
          type="text-box"
        ></input>
        <input
          onChange={setPassword}
          placeholder="password"
          type="password"
        ></input>
        <input type="submit" className={style.button} value={"Login"}></input>
        <div className={style.loginBoxText}>
          <p>dont have an account? </p>

          <Link to="/register" className={style.link}>
            register
          </Link>
        </div>
      </form>
    </div>
  )
}
