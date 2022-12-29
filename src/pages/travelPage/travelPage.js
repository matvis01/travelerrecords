import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import styles from "./travelPage.module.css"
import { useParams } from "react-router-dom"
import { BsHouse, BsFlag } from "react-icons/bs"
import { GrFlag } from "react-icons/gr"
import api from "../../api/api"
import image from "../../assets/fullBg.jpg"
import AddBtn from "./components/addBtn"
import Step from "./components/step"
import ExpandedStep from "./components/expandedStep"

export default function TravelPage(props) {
  const params = useParams()
  const [travel, setTravel] = useState({})

  return (
    <div className={styles.page}>
      <img src={image} className={styles.image} />
      <NavBar />
      <div className={styles.travel}>
        <div className={styles.start}>
          <BsHouse className={styles.icon} />
          <h1>Trip started</h1>
        </div>
        <AddBtn />
        <Step />
        <AddBtn />
        <ExpandedStep />
        <AddBtn size="big" />
        <div className={styles.end}>
          <GrFlag className={styles.icon} />
          <h1>Trip ended</h1>
        </div>
      </div>
    </div>
  )
}
