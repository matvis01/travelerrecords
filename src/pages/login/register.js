import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import style from "./loginStyle.module.css"
import axios from "axios"

const api = axios.create({
  baseURL: "https://travel-records-backend.azurewebsites.net/api/Users",
})

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
  async function submit() {
    if (!user.name) {
      alert("enter name")
      return
    }
    if (!user.email) {
      alert("enter email")
      return
    }
    if (!user.password) {
      alert("enter password")
      return
    }
    if (user.password !== user.confirmPassword) {
      alert("Password doesn't match")
      setUser((prev) => {
        return { ...prev, password: "", confirmPassword: "" }
      })
      return
    }

    try {
      const resp = await api.post("", {
        username: user.name,
        password: user.password,
        email: user.email,
      })
      navigate("/home")
    } catch (err) {
      if (err.response.status === 409) alert("user exists")
    }
  }

  return (
    <div className={style.loginBox}>
      <h1>Travel Records</h1>
      <input onChange={setName} placeholder="username"></input>
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
      <button onClick={submit}>register</button>
      <div className={style.loginBoxText}>
        <Link to="/">login</Link>
      </div>
    </div>
  )
}
