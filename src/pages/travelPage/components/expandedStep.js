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
        <h1>{props.details.date}</h1>
      </div>
      <div className={styles.header}>
        <h1 className={styles.h1}>Description</h1>
        <p className={styles.p}>{props.details.description}</p>
      </div>
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
            Attraction
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
      <button className={styles.editButton}>Edit Step</button>
    </div>
  )
}
