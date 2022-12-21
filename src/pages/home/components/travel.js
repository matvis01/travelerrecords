import React, { useEffect, useState, useContext } from "react"
import styles from "../page.module.css"
import { UserContext } from "../../../context/userContext"
import api from "../../../api/api"

export default function Travel(props) {
  const { user } = useContext(UserContext)
  const [image, setImage] = useState("")

  useEffect(async () => {
    try {
      const res = await api.get(`/Storage/${user.userId}/${props.tripId}/0/0`)
      console.log(res.data)
      setImage(res.data.uri)
    } catch (err) {
      // console.log(err)
    }
  }, [])

  return (
    <div className={styles.travel}>
      <img
        src={
          image ||
          props.image ||
          "https://cezim.pl/wp-content/uploads/2021/12/empty.jpg"
        }
      />
      <h1>{props.name ? props.name : "wycieczka"}</h1>

      <div className={styles.down}>{/* <p>{props.description}</p> */}</div>
    </div>
  )
}
