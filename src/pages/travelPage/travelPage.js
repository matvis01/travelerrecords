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
import Slideshow from "./components/slideShow"

import { useParallax } from "react-scroll-parallax"

export default function TravelPage(props) {
  const travelId = useParams().id
  const { userId } = useContext(UserContext).user
  const [travel, setTravel] = useState([])
  const [focused, setFocused] = useState(-1)
  const [adding, setAdding] = useState(true)
  const [addingIndex, setAddingIndex] = useState(-1)
  const [slideShowOn, setslideShowOn] = useState(false)
  const parallax = useParallax({
    speed: -100,
  })
  const navigate = useNavigate()

  useEffect(() => {
    changeAdding()

    // if (!localStorage.getItem("token")) {
    //   navigate("/")
    // }
    async function fetchData() {
      try {
        const res = await api.get(
          `Stages/${travelId}/tripsStages`,
          addAuthToken
        )
        const { data } = res
        setTravel(() => {
          return data.map((el) => {
            return {
              userId: el.userId,
              title: el.title,
              position: { lat: el.latitude, lng: el.longitude },
              description: el.stageDesc,
              date: el.creationDate,
              images: "",
              stageId: el.stageId,
              travelId: travelId,
            }
          })
        })
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
      console.log("res1:", res)
      const res2 = await api.post(
        `/Storage/${userId}/${travelId}/${res.data.stageId}/0`,
        details.image,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )

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
            stageId: res.data.stageId,
            travelId: travelId,
            userId: userId,
          },
          ...after,
        ]
      })
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
        <NavBar
          isTravel={true}
          setTravel={() => {
            setslideShowOn(true)
          }}
        />
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
        {slideShowOn && (
          <Slideshow
            userId={userId}
            travelId={travelId}
            close={(e) => {
              if (e.target.id == "overlay") {
                setslideShowOn(false)
              }
            }}
          />
        )}
      </div>
    </>
  )
}
