import React, { useState } from "react"
import styles from "./addTravel.module.css"

export default function AddTravel(props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState()

  const handleImageChange = (event) => {
    setFile(event.target.files[0])
    // console.log(file)

    // let formData = new FormData()
    // formData.append("file", event.target.files[0])
    // formData.append("filename", event.target.files[0].name)

    // setImage(event.target.result)
    // console.log(event.target.files)

    // let imageFile = event.target.files[0]

    // if (imageFile) {
    //   const reader = new FileReader()
    //   reader.onload = (event) => {
    //     // setImage(event.target.result)
    //     setValues({
    //       imageFile: imageFile,
    //       imageSrc: event.target.result,
    //     })
    //   }
    //   reader.readAsDataURL(imageFile)
    // }
  }
  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append("file", file)

    props.add(title, description, formData)

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
        <input
          type="file"
          accept="image/jpeg"
          className={styles.chooseFile}
          onChange={handleImageChange}
        />
        <div className={styles.buttons}>
          <button className={styles.subimitBtn} onClick={props.changeAdding}>
            Cancel
          </button>
          <input type="submit" value={"Save"} className={styles.subimitBtn} />
        </div>
      </form>
    </div>
  )
}
