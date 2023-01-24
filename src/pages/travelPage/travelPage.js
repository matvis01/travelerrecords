import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import styles from "./travelPage.module.css"
import { useParams } from "react-router-dom"
import { BsHouse } from "react-icons/bs"
import { GrFlag } from "react-icons/gr"
import api from "../../api/api"
import image from "../../assets/fullBg.jpg"
import AddBtn from "./components/addBtn"
import Step from "./components/step"
import ExpandedStep from "./components/expandedStep"
import AddStep from "./components/addStep"

export default function TravelPage(props) {
  const params = useParams()
  const [travel, setTravel] = useState([])
  const [focused, setFocused] = useState(-1)
  const [adding, setAdding] = useState(false)
  let addingIndex = -1

  useEffect(() => {
    // changeAdding()
    // focused.length ? setAdding(false) : setAdding(true)
  }, [])

  function changeFocused(index) {
    setFocused(index)
  }

  function changeAdding() {
    setAdding((prev) => !prev)
  }

  console.log(travel)

  function addStep(details, index) {
    setTravel((prev) => {
      return [
        ...prev,
        {
          title: details.title,
          position: details.position,
          description: details.description,
          date: details.date,
          images: details.images,
        },
      ]
    })
  }

  const steps = travel?.map((el, index) => {
    return (
      <div key={index}>
        <AddBtn index={index} changeAdding={changeAdding} />
        {focused === index ? (
          <ExpandedStep details={el} />
        ) : (
          <Step
            click={(index) => {
              changeFocused(index)
            }}
            index={index}
            details={el}
          />
        )}
      </div>
    )
  })

  return (
    <>
      <div className={styles.page}>
        <NavBar />
        {adding && (
          <AddStep
            save={(details, index) => {
              addStep(details, index)
            }}
            changeAdding={changeAdding}
            index={addingIndex}
          />
        )}
        <div className={styles.travel}>
          <img src={image} className={styles.image} />
          <div className={styles.navBarBg}></div>
          <div className={styles.start}>
            <BsHouse className={styles.icon} />
            <h1>Trip started</h1>
          </div>
          {steps}
          <AddBtn
            size="big"
            changeAdding={changeAdding}
            index={travel.length}
          />
          <div className={styles.end}>
            <GrFlag className={styles.icon} />
            <h1>Trip ended</h1>
          </div>
        </div>
      </div>
    </>
  )
}
