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
import { ParallaxProvider, useParallax } from "react-scroll-parallax"

export default function TravelPage(props) {
  const params = useParams()
  const [travel, setTravel] = useState([])
  const [focused, setFocused] = useState(-1)
  const [adding, setAdding] = useState(true)
  const [addingIndex, setAddingIndex] = useState(-1)

  const parallax = useParallax({
    speed: -100,
  })

  useEffect(() => {
    changeAdding()
  }, [])

  function changeFocused(index) {
    setFocused(index)
  }

  function changeAdding(index) {
    setAddingIndex(index)

    setAdding((prev) => !prev)
  }

  console.log(travel)

  function addStep(details, index) {
    let before = []
    let after = []
    for (let i = 0; i < travel.length; i++) {
      if (i < index) {
        before.push(travel[i])
      } else {
        after.push(travel[i])
      }
    }
    setTravel((prev) => {
      return [
        ...before,
        {
          title: details.title,
          position: details.position,
          description: details.description,
          date: details.date,
          images: details.images,
        },
        ...after,
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
        <div className={styles.travel}>
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
        <img ref={parallax.ref} src={image} className={styles.image} />
        {adding && (
          <AddStep
            save={(details, index) => {
              addStep(details, index)
            }}
            changeAdding={changeAdding}
            index={addingIndex}
          />
        )}
      </div>
    </>
  )
}
