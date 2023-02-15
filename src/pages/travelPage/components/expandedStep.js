import React, { useEffect, useMemo, useState } from "react"
import styles from "./components.module.css"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import Stage from "./stage"
import AddStage from "./addStage"
import api, { addAuthToken } from "../../../api/api"

export default function ExpandedStep(props) {
  const [stages, setStages] = useState([])
  const [addingStage, setAddingStage] = useState({ adding: false, type: "" })
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(
          `/Posts/${props.details.stageId}/stagePosts`,

          addAuthToken
        )
        console.log("res:", res)
        const { data } = res
        if (!data.imageId) {
          setStages(() => {
            return data.map((el) => {
              return {
                name: "description",
                description: el.story,
              }
            })
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  async function saveStage(data) {
    const { details } = props
    // {
    //   "postId": 0,
    //   "userId": 0,
    //   "tripId": 0,
    //   "stageId": 0,
    //   "imageId": "string",
    //   "story": "string",
    //   "creationDate": "2023-02-15T17:05:09.772Z"
    // }
    if (data.name === "description") {
      const travelId = Number(details.travelId)
      try {
        const res = await api.post(
          "/Posts",
          {
            userId: details.userId,
            tripId: travelId,
            stageId: details.stageId,
            story: data.description,
            imageId: "",
          },
          addAuthToken
        )
        console.log("res:", res)
      } catch (e) {
        console.log(e)
      }
    }
    setStages((prev) => {
      return [...prev, data]
    })
  }

  // console.log(" props.details.position:", props.details.position)
  const center = props.details.position
  return (
    <div className={styles.step}>
      <div className={styles.top}>
        <h1>{props.details.title}</h1>
        <p>{props.details.date.slice(0, 10)}</p>
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
