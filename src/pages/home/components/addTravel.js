import React, { useState } from "react"
import styles from "./addTravel.module.css"

export default function AddTravel(props) {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

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
  async function handleSubmit(e) {
    e.preventDefault()
    props.add(title, description, image)

    props.changeAdding()
  }

  return (
    <div className={styles.overlay}>
      <form className={styles.overlayInner} onSubmit={handleSubmit}>
        <label className={styles.text}>Travel Details:</label>
        <input
          type="text-box"
          className={styles.destination}
          placeholder="Destination.."
          value={title}
          onChange={(e) => {
            e.target.value.length < 25 && setTitle(e.target.value)
          }}
        />
        <textarea
          className={styles.description}
          placeholder="Description of the trip.."
          value={description}
          onChange={(e) => {
            e.target.value.length < 150 && setDescription(e.target.value)
          }}
        ></textarea>
        <label className={styles.textCover}>Select cover photo:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input type="submit" value={"Save"} className={styles.subimitBtn} />
      </form>
    </div>
  )
}
