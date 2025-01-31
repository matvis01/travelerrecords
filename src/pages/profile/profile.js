import React, { useContext, useState } from "react"
import styles from "./profile.module.css"
import NavBar from "../../components/NavBar"
import { UserContext } from "../../context/userContext"
import api, { addAuthToken } from "../../api/api"

export default function Profile(props) {
  const { user, setUser } = useContext(UserContext)

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")




  async function submit(e) {
    e.preventDefault()
    setUser((prev) => ({
      ...prev,
      username: userName,
      password: password,
    }))

    try {
      const res = await api.put(`Users/${user.userId}`, user, addAuthToken)
      console.log("res:", res)
    } catch (e) {
      console.log(e)
    }

    console.log(user)
  }

  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.myForm}>
        <h1 className={styles.text}>User Profile</h1>
        <p className={styles.text}>Username: {user.username}</p>
        <p className={styles.text}>Email: {user.email}</p>
        
      </div>

      {/* <form className={styles.myForm} onSubmit={submit}>
        <label className={styles.text}>Profile settings: </label>
        <input
          type="text-box"
          placeholder="Username"
          className={styles.inputCredentials}
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value)
          }}
        />
        <input
          type="text-box"
          placeholder="Password"
          className={styles.inputCredentials}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      
        <input type="submit" value="Submit" className={styles.button} />
      </form> */}
    </div>
  )
}
