import React, { useEffect, useState } from "react"
import SideBar from "../../components/SideBar"
import styles from "./travelPage.module.css"
import { useParams } from "react-router-dom"
import api from "../../api/api"

export default function TravelPage(props) {
  const params = useParams()
  const [travel, setTravel] = useState({})

  useEffect(async () => {}, [])
  return (
    <div>
      <SideBar />
      <div className={styles.myGrid}>
        <div className={styles.text}>
          <h1>Venice</h1>
          <p>oh aoidsa oijoiv;o ihoia lijvi</p>
        </div>
        <div className={styles.locations}></div>
        <div className={styles.map}></div>
        <div className={styles.stages}></div>
      </div>
    </div>
  )
}
