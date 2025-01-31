import React, { useEffect, useState, useContext } from "react"
import { UserContext } from "../../../context/userContext"
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
  const { userId } = useContext(UserContext).user
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(
          `/Posts/${props.details.stageId}/stagePosts`,
          addAuthToken
        )
        const { data } = res
        setStages(() => {
          return data.map((el) => {
            if (el.imageId) {
              return {
                name: "images",
                imageId: el.imageId,
                userId: userId,
                travelId: el.tripId,
                stageId: el.stageId,
                postId: el.postId,
              }
            } else {
              return {
                name: "description",
                description: el.story,
                userId: el.userId,
                travelId: el.tripId,
                stageId: el.stageId,
                postId: el.postId,
              }
            }
          })
        })
      } catch (e) {
        console.log(e)
      }

      try {
        const res = await api.get(
          `/Attractions/${props.details.stageId}/allStageAttractions`,
          addAuthToken
        )
        const { data } = res
        setStages((prev) => {
          return [
            ...prev,
            ...data.map((el) => {
              console.log("el:", el)
              return {
                name: "attraction",
                description: el.attractionDesc,
                postId: el.attractionId,
                cost: el.popularity,
              }
            }),
          ]
        })
      } catch (e) {
        console.log(e)
      }

      console.log("stages", stages)
    }
    fetchData()
  }, [])

  async function saveStage(data) {
    const { details } = props
    let postId = 0
    const travelId = Number(details.travelId)
    if (data.name === "description") {
      try {
        const res = await api.post(
          "/Posts",
          {
            userId: details.userId,
            tripId: travelId,
            stageId: details.stageId,
            story: data.description,
            imageId: ``,
          },
          addAuthToken
        )
      } catch (e) {
        console.log(e)
      }
    } else if (data.name === "images") {
      const travelId = Number(details.travelId)
      try {
        const res = await api.post(
          "/Posts",
          {
            userId: details.userId,
            tripId: travelId,
            stageId: details.stageId,
            story: "photo",
            imageId: `${details.userId}/${travelId}/${details.stageId}/1`,
          },
          addAuthToken
        )
        postId = res.data.postId
        const res2 = await api.post(
          `/Storage/${details.userId}/${travelId}/${details.stageId}/${res.data.postId}`,
          data.images,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const res = await api.post(
          `/Attractions`,
          {
            attractionName: "atraction",
            attractionDesc: data.atractionName,
            score: 0,
            popularity: data.cost,
          },
          addAuthToken
        )
        const { attractionId } = res.data

        const res2 = await api.post(
          `/Attractions/${attractionId}/${details.stageId}`,
          {
            attractionId: attractionId,
            stageId: details.stageId,
          },
          addAuthToken
        )
      } catch (e) {
        console.log(e)
      }
    }

    console.log("data:", data)
    setStages((prev) => {
      return [
        ...prev,
        {
          ...data,
          description: data.atractionName || data.description,
          userId: userId,
          travelId: travelId,
          stageId: details.stageId,
          postId: postId,
        },
      ]
    })
  }
  const center = props.details.position
  return (
    <div className={styles.step}>
      <div className={styles.top}>
        <h1>{props.details.title}</h1>
        <h1>{props.details.date.slice(0, 10)}</h1>
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
    </div>
  )
}
