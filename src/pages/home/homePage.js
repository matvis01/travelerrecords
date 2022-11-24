import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Travel from "./travel"

export default function Home() {
  const navigate = useNavigate()

  function logout() {
    navigate("/login")
  }
  return (
    <div>
      <button onClick={logout}>Log Out</button>
      <Travel />
      <Travel />
    </div>
  )
}
