import React, { useState } from "react"
import styles from "./components.module.css"

export default function AddStage(props) {
  const [atractionName, setAtractionName] = useState("")
  const [cost, setCost] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState()

  const handleImageChange = (event) => {
    setFile(event.target.files[0])
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)

    const data = {
      name: props.name,
      atractionName: atractionName,
      description: description,
      cost: cost,
      images: formData,
      file: file,
    }
    props.save(data)
    props.changeAdding()
  }

  return (
    <form className={styles.stage} onSubmit={handleSubmit}>
      {props.name === "images" ? (
        <>
          <br></br>
          <label>Select photo:</label>
          <input type="file" accept="image/jpeg" onChange={handleImageChange} />
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
