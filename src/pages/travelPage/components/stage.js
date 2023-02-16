import React, { useEffect, useState } from "react"
import styles from "./components.module.css"
import api, { addAuthToken } from "../../../api/api"

export default function Stage(props) {
  const { name, images, atractionName, description, cost } = props.data
  const [image, setImage] = useState("")
  useEffect(() => {
    async function fetchData() {
      console.log("props", props.data)
      try {
        const res = await api.get(
          `/Storage/${props.data.userId}/${props.data.travelId}/${props.data.stageId}/${props.data.postId}`,
          addAuthToken
        )
        setImage(res.data.uri)
      } catch (e) {
        console.log(e)
      }
    }
    if (name === "images") {
      fetchData()
    }
  }, [props.data])

  if (name === "images") {
    return (
      <div className={styles.stage}>
        <h1 className={styles.h1}>Photos</h1>
        {image && <img src={image} />}
      </div>
    )
  } else if (name === "description") {
    return (
      <div className={styles.stage}>
        <h1 className={styles.h1}>Description</h1>
        <p className={styles.p}>{description}</p>
      </div>
    )
  } else {
    return (
      <div className={styles.stage}>
        <h1 className={styles.h1}>Attraction</h1>
        <p className={styles.p}>{atractionName}</p>
        <p className={styles.p}>Cost: {cost}</p>
        {images && <img alt="image" src={images[0]} />}
      </div>
    )
  }
}
