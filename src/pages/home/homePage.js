import React, { useEffect, useState, useContext } from "react"
import Travel from "./components/travel"
import NavBar from "../../components/NavBar"
import styles from "./page.module.css"
import AddTravel from "./components/addTravel"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import api from "../../api/api"
import image1 from "../../assets/Background.png"
import image2 from "../../assets/Layer 2.png"
import image3 from "../../assets/Layer 3.png"

export default function Home() {
  const [adding, setAdding] = useState(false)
  const [travels, setTravels] = useState([])
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    // if (!user.userId) {
    //   navigate("/")
    // }
    if (!user.userId) {
      return
    }

    const fetchData = async () => {
      try {
        const res = await api.get(`/Trips/${user.userId}/userTrips`)
        setTravels(res.data)
        setLoading(false)
      } catch (e) {
        console.error(e)
        return
      }
    }

    fetchData()
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
      <NavBar />
      <header>
        <img src={image1} className={styles.im1} />
        <img src={image2} className={styles.im2} />

        <h1 className={styles.text}>Travel Records</h1>
        <img src={image3} className={styles.im3} />
      </header>
      <div className={styles.content}>
        <h1 className={styles.text}>Places I've been to...</h1>
        <div className={styles.travels}>
          <div className={styles.add} onClick={changeAdding}>
            New travel
          </div>
          {loading ? (
            <p>loading....</p>
          ) : (
            travels?.map((travel) => (
              <Travel
                name={travel.title}
                description={travel.tripDesc}
                imageId={travel.imageId}
                image={travel.image}
                tripId={travel.tripId}
              />
            ))
          )}
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
