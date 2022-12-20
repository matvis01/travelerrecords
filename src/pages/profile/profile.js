import React, { useContext, useState } from "react"
import styles from "./profile.module.css"
import SideBar from "../../components/SideBar"
import { UserContext } from "../../context/userContext"
import api from "../../api/api"

export default function Profile(props) {
  const { user, setUser } = useContext(UserContext)

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState(null)

  function savePicture(event) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  function submit(e) {
    e.preventDefault()
    setUser((prev) => ({
      ...prev,
      username: userName,
      image: image,
      password: password,
    }))
  }

  return (
    <div className={styles.page}>
      <SideBar />
      <form className={styles.form} onSubmit={submit}>
        <label>Profile picture: </label>
        <input type="file" onChange={savePicture}></input>
        <label for={userName}>username: </label>
        <input
          type="text-box"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value)
          }}
        />

        <label for={password}>password: </label>
        <input
          type="text-box"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}
