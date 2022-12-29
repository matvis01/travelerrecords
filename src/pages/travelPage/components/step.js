import React from "react"
import img from "../../../assets/blankProfile.png"
import styles from "./components.module.css"

export default function Step(props) {
  return (
    <div className={styles.step}>
      <div className={styles.top}>
        <h1>Rhodes</h1>
        <p>26 december 22</p>
      </div>
      <img
        className={styles.mainImg}
        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/81/2f/1e/caption.jpg?w=700&h=-1&s=1&cx=3705&cy=1254&chk=v1_660f815f73069c16e175"
      />
    </div>
  )
}
