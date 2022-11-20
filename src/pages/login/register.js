import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    name: "",
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
  function setName(event) {
    setUser((prev) => {
      return { ...prev, name: event.target.value };
    });
  }

  return (
    <div className="loginBox">
      <input onChange={setName} w="90%"></input>
      <input onChange={setEmail} w="90%" m="10px"></input>
      <input onChange={setPassword} w="90%" mb="10px"></input>
      <button>register</button>
      <div className="loginBox--text">
        <Link to="/login">login</Link>
      </div>
    </div>
  );
}
