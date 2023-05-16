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
import { Link, animateScroll as scroll } from "react-scroll"
import { addAuthToken } from "../../api/api"

export default function Home() {
  const [adding, setAdding] = useState(false)
  const [travels, setTravels] = useState([])
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/")
    // }
    const fetchData = async () => {
      try {
        const res = await api.get(
          `/Trips/${user.userId}/userTrips`,
          addAuthToken
        )
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
    //scroll.scrollToTop();
  }

  async function addTravel(name, description, image) {
    let tripId = 0

    //post travel
    try {
      const res = await api.post(
        `/Trips`,
        {
          userId: user.userId,
          tripDesc: description,
          title: name,
        },
        addAuthToken
      )
      tripId = res.data.tripId
    } catch (e) {
      console.log(e)
    }

    try {
      const res = await api.post(
        `/Storage/${user.userId}/${tripId}/0/0`,
        image,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      image = res.data.uri
    } catch (e) {
      console.log(e)
    }

    setTravels((prev) => [
      ...prev,
      { title: name, tripDesc: description, image: image, tripId: tripId },
    ])
  }

  return (
    <>
      <NavBar />
      <div className={styles.page}>
        <header>
          <img src={image1} className={styles.im1} />
          <img src={image2} className={styles.im2} />

          <h1 className={styles.text}>Travel Records</h1>
          <img src={image3} className={styles.im3} />
        </header>
        <div className={styles.navBarBg}></div>
        <div className={styles.content}>
          <h1 className={styles.text}>Places I've been to...</h1>
          <div className={styles.travels}>
            <div className={styles.add} onClick={changeAdding}>
              New travel
            </div>
            {loading ? (
              <p>loading....</p>
            ) : (
              travels.map((travel, index) => (
                <Travel
                  key={index}
                  name={travel.title}
                  description={travel.tripDesc}
                  // imageId={travel.imageId}
                  image={travel.image}
                  tripId={travel.tripId}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {adding && (
        <AddTravel
          changeAdding={changeAdding}
          add={(name, description, image) =>
            addTravel(name, description, image)
          }
        />
      )}
    </>
  )
}
