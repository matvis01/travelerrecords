import React, { useState } from "react"

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
    <form onSubmit={handleSubmit}>
      <input
        type="text-box"
        placeholder="Destination.."
        value={title}
        onChange={(e) => {
          e.target.value.length < 25 && setTitle(e.target.value)
        }}
      />
      {props.name === "images" ? (
        <>
          <label>Select photos:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <p>Added Photos: {images.length}</p>
        </>
      ) : props.name == "description" ? (
        <>
          <label>Stage description:</label>
          <input
            type="text-box"
            placeholder="description.."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
        </>
      ) : (
        <>
          <label>atraction:</label>
          <input
            type="text-box"
            placeholder="description.."
            value={atractionName}
            onChange={(e) => {
              setAtractionName(e.target.value)
            }}
          />
          <label>cost:</label>
          <input
            type="text-box"
            placeholder="cost.."
            value={cost}
            onChange={(e) => {
              setCost(e.target.value)
            }}
          />
          <label>Select photo:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </>
      )}
      <div>
        <button
          onClick={() => {
            props.changeAdding()
          }}
        >
          Cancel
        </button>
        <input type="submit" value={"Save"} />
      </div>
    </form>
  )
}
