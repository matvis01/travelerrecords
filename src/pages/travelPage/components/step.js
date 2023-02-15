import React from "react"
import styles from "./components.module.css"

export default function Step(props) {
  return (
    <div
      className={styles.step}
      onClick={() => {
        props.click(props.index)
      }}
    >
      <div className={styles.top}>
        <h1>{props.details.title}</h1>
        <h1>{props.details.date}</h1>
      </div>
      {props.details.images[0] && (
        <img
          className={styles.mainImg}
          src={
            props.details.images[0] ||
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/81/2f/1e/caption.jpg?w=700&h=-1&s=1&cx=3705&cy=1254&chk=v1_660f815f73069c16e175"
          }
        />
      )}
    </div>
  )
}
