import React, { Component, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./loginStyle.css";

export default function Login() {
  const [user, setUser] = useState({
    name: "m",
    email: "",
    password: "",
  });
  function setPassword(event) {
    setUser((prev) => {
      return { ...prev, password: event.target.value };
    });
  }

  function setEmail(event) {
    setUser((prev) => {
      return { ...prev, email: event.target.value };
    });
  }

  function login() {
    //history.push("/login");
  }
  return (
    <div className="loginBox">
      <input onChange={setEmail}></input>
      <input onChange={setPassword}></input>
      <button onClick={login}>login</button>
      <div className="loginBox--text">
        <p>dont have an account? </p>
        <div>
          <Link to="/register">register</Link>
        </div>
      </div>
    </div>
  );
}
