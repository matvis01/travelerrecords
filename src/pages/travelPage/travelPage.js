import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import styles from "./travelPage.module.css"
import { useParams } from "react-router-dom"
import api from "../../api/api"
import image from "../../assets/fullBg.jpg"

export default function TravelPage(props) {
  const params = useParams()
  const [travel, setTravel] = useState({})

  useEffect(() => {}, [])
  return (
    <div>
      <img src={image} className={styles.image} />
      <NavBar />

      <div className={styles.myGrid}></div>
    </div>
  )
}
