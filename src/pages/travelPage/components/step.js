import React, { useEffect, useState } from "react"
import styles from "./components.module.css"
import api, { addAuthToken } from "../../../api/api"

export default function Step(props) {
  const [image, setImage] = useState("")
  const { details } = props
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(
          `/Storage/${details.userId}/${details.travelId}/${details.stageId}/0`,
          addAuthToken
        )
        setImage(res.data.uri)
      } catch (e) {
        setImage("https://picsum.photos/500/300?random")
        console.log(e)
      }
    }
    fetchData()
  }, [details])
  return (
    <div
      className={styles.step}
      onClick={() => {
        props.click(props.index)
      }}
    >
      <div className={styles.top}>
        <h1>{props.details.title}</h1>
        <p>{props.details.date.slice(0, 10)}</p>
      </div>
      {image && <img className={styles.mainImg} src={image} />}
    </div>
  )
}
