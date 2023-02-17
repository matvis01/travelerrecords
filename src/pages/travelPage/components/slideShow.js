import React, { useEffect, useState } from "react"
import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import styles from "./components.module.css"
import api, { addAuthToken } from "../../../api/api"

export default function Slideshow(props) {
  const [images, setImages] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`Storage/Get`, addAuthToken)
        const { data } = res

        const travelData = data.filter((el) => {
          const splited = el.name.split("_")
          return splited[0] == props.userId && splited[1] == props.travelId
        })
        setImages(() => {
          return travelData.map((el) => {
            return { url: el.uri }
          })
        })
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        props.close(e)
      }}
      id="overlay"
    >
      <div className={styles.slides} id="inner">
        <Slide>
          {images?.map((slideImage, index) => (
            <div className={styles.imageContainer} key={index}>
              <img src={slideImage.url} className={styles.slideStyle}></img>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  )
}
