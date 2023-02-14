import React, { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/userContext"
import NavBar from "../../components/NavBar"
import styles from "./travelPage.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { BsHouse } from "react-icons/bs"
import { GrFlag } from "react-icons/gr"
import api, { addAuthToken } from "../../api/api"
import image from "../../assets/fullBg.jpg"
import AddBtn from "./components/addBtn"
import Step from "./components/step"
import ExpandedStep from "./components/expandedStep"
import AddStep from "./components/addStep"

import { useParallax } from "react-scroll-parallax"

export default function TravelPage(props) {
  const travelId = useParams().id
  const { userId } = useContext(UserContext).user
  const [travel, setTravel] = useState([])
  const [focused, setFocused] = useState(-1)
  const [adding, setAdding] = useState(true)
  const [addingIndex, setAddingIndex] = useState(-1)

  const parallax = useParallax({
    speed: -100,
  })
  const navigate = useNavigate()
  useEffect(() => {
    changeAdding()

    if (!localStorage.getItem("token")) {
      navigate("/")
    }
    async function fetchData() {
      try {
        const res = await api.get(`Stages/${travelId}`, addAuthToken)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  function changeFocused(index) {
    setFocused(index)
  }

  function changeAdding(index) {
    setAddingIndex(index)

    setAdding((prev) => !prev)
  }

  async function addStep(details, index) {
    let before = []
    let after = []
    for (let i = 0; i < travel.length; i++) {
      if (i < index) {
        before.push(travel[i])
      } else {
        after.push(travel[i])
      }
    }
    setTravel(() => {
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

    //{lat: 32.7766642, lng: -96.79698789999999}
    console.log(details)
    try {
      const res = await api.post(
        `/Stages`,
        {
          userId: userId,
          tripId: travelId,
          title: details.title,
          stageDesc: details.description,
          creationDate: details.date,
          longitude: details.position.lng,
          latitude: details.position.lat,
        },
        addAuthToken
      )
    } catch (e) {
      console.log(e)
    }
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
