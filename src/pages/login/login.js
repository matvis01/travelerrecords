import React, { Component, useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import style from "./loginStyle.module.css"
import { UserContext } from "../../context/userContext"
import api, { addAuthToken } from "../../api/api"

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
    e.preventDefault()
    try {
      const res = await api
        .post("/Login", {
          username: user.username,
          password: user.password,
        })
        .then(async (res) => {
          const token = res.data
          console.log("token:", token)
          localStorage.setItem("token", token)
          const res2 = await api.get(
            `/Users/${user.username}/${user.password}`,
            addAuthToken
          )
          const u = res2.data.value
          setUser(u)
          localStorage.setItem("user", JSON.stringify(u))
          navigate("/home")
        })
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
