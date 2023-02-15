import React from "react"
import styles from "./components.module.css"

export default function AddBtn(props) {
  function add() {
    props.changeAdding(props.index)
  }
  return (
    <div className={props.size === "big" ? styles.addBtnBig : styles.addBtn}>
      <div className={styles.line}></div>
      <button
        onClick={add}
        className={props.size === "big" ? styles.plusBig : styles.plus}
      >
        +
      </button>
      <span className={props.size === "big" ? styles.textBig : styles.text}>
        Add step
      </span>
    </div>
  )
}
