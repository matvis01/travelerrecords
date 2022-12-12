import React, { useState } from "react"
import styles from "./addTravel.module.css"

export default function AddTravel(props) {
  const [image, setImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <div className={styles.overlay}>
      <form className={styles.overlayInner}>
        <label>Travel Title:</label>
        <input type="text-box" />
        <label>description:</label>
        <input type="text" />
        <label>cover photo:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input type="submit" value={"save"} className={styles.subimitBtn} />
      </form>
    </div>
  )
}
