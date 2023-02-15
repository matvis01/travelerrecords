import React, { useState } from "react"
import styles from "./components.module.css"

export default function AddStage(props) {
  const [images, setImages] = useState([])
  const [title, setTitle] = useState("")
  const [atractionName, setAtractionName] = useState("")
  const [cost, setCost] = useState("")
  const [description, setDescription] = useState("")

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target.result])
      }
      reader.readAsDataURL(file)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const data = {
      name: props.name,
      atractionName: atractionName,
      title: title,
      description: description,
      cost: cost,
      images: images,
    }
    props.save(data)
    props.changeAdding()
  }

  return (
    <form className={styles.stage} onSubmit={handleSubmit}>
      {props.name === "images" ? (
        <>
          <br></br><label>Select photos:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <p>Added Photos: {images.length}</p>
        </>
      ) : props.name == "description" ? (
        <>
          <label>Stage description:</label>
          <input
            type="text-box"
            placeholder="Description.."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
        </>
      ) : (
        <>
        <label>Attraction description:</label>
          <input
            type="text-box"
            placeholder="Description.."
            value={atractionName}
            onChange={(e) => {
              setAtractionName(e.target.value)
            }}
          />
          <input
            type="text-box"
            placeholder="Cost.."
            value={cost}
            onChange={(e) => {
              setCost(e.target.value)
            }}
          />
          <label>Select photo:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </>
      )}
      <div className={styles.addButtons}>
        <button
          className={styles.subimitBtn}
          onClick={() => {
            props.changeAdding()
          }}
        >
          Cancel
        </button>
        <input className={styles.subimitBtn} type="submit" value={"Save"} />
      </div>
    </form>
  )
}
