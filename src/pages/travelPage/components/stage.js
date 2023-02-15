import React from "react"
import styles from "./components.module.css"

export default function Stage(props) {
  const { name, images, atractionName, title, description, cost } = props.data

  if (name === "images") {
    return (
      <div className={styles.stage}>
        <h1 className={styles.h1}>Photos</h1>
        {images?.map((el, i) => (
          <img
            key={i}
            src={el || "https://cezim.pl/wp-content/uploads/2021/12/empty.jpg"}
          />
        ))}
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
