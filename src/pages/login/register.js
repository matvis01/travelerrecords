import React, { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import style from "./loginStyle.module.css"
import { UserContext } from "../../context/userContext"

import api from "../../api/api"

export default function Login() {
  const { user, setUser } = useContext(UserContext)
  const [confPass, setConfPass] = useState("")

  useEffect(() => {
    setUser({})
  }, [])

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
      return { ...prev, username: event.target.value }
    })
  }
  function setConfirmPassword(event) {
    setConfPass((prev) => {
      return event.target.value
    })
  }

  let navigate = useNavigate()
  console.log(user)
  async function submit() {
    if (!user.username) {
      alert("enter username")
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
    if (user.password !== confPass) {
      alert("Password doesn't match")
      setUser((prev) => {
        return { ...prev, password: "", confirmPassword: "" }
      })
      return
    }

    try {
      const res = await api.post("/Users/", {
        username: user.username,
        password: user.password,
        email: user.email,
      })
      setUser(res.data)
      navigate("/home")
    } catch (err) {
      setUser({})
      if (err.response.status === 409) alert("user exists")
    }
  }

  return (
    <div className={style.loginPage}>
      <div className={style.loginBox}>
        <h1>Travel Records</h1>
        <input
          onChange={setName}
          placeholder="username"
          value={user.username}
        ></input>
        <input
          onChange={setEmail}
          placeholder="email"
          type="email"
          value={user.email}
        ></input>
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
          value={confPass}
        ></input>
        <button onClick={submit}>register</button>
        <div className={style.loginBoxText}>
          <Link to="/">login</Link>
        </div>
      </div>
    </div>
  )
}
