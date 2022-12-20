import React, { useEffect, useState, useContext } from "react"
import Travel from "./components/travel"
import SideBar from "../../components/SideBar"
import styles from "./page.module.css"
import AddTravel from "./components/addTravel"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import api from "../../api/api"

export default function Home() {
  const [adding, setAdding] = useState(false)
  const [travels, setTravels] = useState([])
  const { user } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(async () => {
    // if (!user.userId) {
    //   navigate("/")
    // }
    try {
      const res = await api.get(`/Trips/${user.userId}/userTrips`)
      console.log(res.data)

      setTravels(res.data)
    } catch (e) {
      console.log(e)
      return
    }
  }, [])

  function changeAdding() {
    setAdding((prev) => !prev)
  }

  async function addTravel(name, description, image) {
    setTravels((prev) => [
      ...prev,
      { title: name, tripDesc: description, image: image },
    ])
    let travelId = 0

    try {
      const res = await api.post(`/Trips`, {
        userId: user.userId,
        tripDesc: description,
        title: name,
      })
      travelId = res.data.travelId
    } catch (e) {
      console.log(e)
    }
    // try {
    //   const res = await api.post(`/Trips/${user.userId}/${travelId}/0/0`, {
    //     image,
    //   })
    // } catch (e) {
    //   console.log(e)
    // }
  }

  return (
    <div className={styles.page}>
      <SideBar />
      <div className={styles.content}>
        <h1 className={styles.text}>Places I've been to...</h1>
        <div className={styles.travels}>
          <div className={styles.add} onClick={changeAdding}>
            New travel
          </div>
          {travels.map((travel) => (
            <Travel
              name={travel.title}
              description={travel.tripDesc}
              imageId={travel.imageId}
              image={travel.image}
              tripId={travel.tripId}
            />
          ))}
        </div>
      </div>
      {adding && (
        <AddTravel
          changeAdding={changeAdding}
          add={(name, description, image, file) =>
            addTravel(name, description, image)
          }
        />
      )}
    </div>
  )
}
