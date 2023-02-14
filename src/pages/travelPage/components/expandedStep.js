import React, { useMemo, useState } from "react"
import styles from "./components.module.css"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import Stage from "./stage"
import AddStage from "./addStage"

export default function ExpandedStep(props) {
  const [stages, setStages] = useState([])
  const [addingStage, setAddingStage] = useState({ adding: false, type: "" })
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  })

  function saveStage(data) {
    setStages((prev) => {
      return [...prev, data]
    })

    console.log("stages:")
    console.log(stages)
  }

  // console.log(" props.details.position:", props.details.position)
  const center = props.details.position
  return (
    <div className={styles.step}>
      <div className={styles.top}>
        <h1>{props.details.title}</h1>
        <p>{props.details.date}</p>
      </div>
      <p>{props.details.description}</p>
      {stages?.map((el, i) => {
        return <Stage key={i} data={el} />
      })}
      {addingStage.adding ? (
        <AddStage
          name={addingStage.type}
          save={saveStage}
          changeAdding={() => setAddingStage({ adding: false, type: "" })}
        />
      ) : (
        <div className={styles.addButtons}>
          <button
            className={styles.editButton}
            onClick={() => setAddingStage({ adding: true, type: "images" })}
          >
            Photos
          </button>
          <button
            className={styles.editButton}
            onClick={() =>
              setAddingStage({ adding: true, type: "description" })
            }
          >
            Description
          </button>
          <button
            className={styles.editButton}
            onClick={() => setAddingStage({ adding: true, type: "atraction" })}
          >
            Atraction
          </button>
        </div>
      )}

      {isLoaded ? (
        <GoogleMap zoom={10} center={center} mapContainerClassName={styles.map}>
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <h1>Loading...</h1>
      )}
      <button className={styles.editButton}>edit step</button>
    </div>
  )
}
