import React, { useEffect, useState } from "react"
import Travel from "./components/travel"
import SideBar from "../../components/SideBar"
import styles from "./page.module.css"
import AddTravel from "./components/addTravel"

export default function Home() {
  const [adding, setAdding] = useState(false)

  function changeAdding() {
    setAdding((prev) => !prev)
  }
  return (
    <div className={styles.page}>
      <SideBar />
      <div className={styles.content}>
        <h1 className={styles.text}>Places I've been to...</h1>
        <div className={styles.travels}>
          <button className={styles.add} onClick={changeAdding}>
            add new travel
          </button>
          <Travel nazwa="Grecja " />
          <Travel />
          <Travel />
          <Travel />
          <Travel />
        </div>
      </div>
      {adding && <AddTravel changeAdding={changeAdding} />}
    </div>
  )
}
