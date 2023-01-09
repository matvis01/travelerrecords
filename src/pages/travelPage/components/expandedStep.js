import React, { useMemo } from "react"
import styles from "./components.module.css"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

export default function ExpandedStep(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  })
  // const center = useMemo(() => ({ lat: 44, lng: -80 }, []))

  console.log("Lat lng w expanded step: " + props.details.position)
  console.log(props)
  const center = props.details.position
  return (
    <div className={styles.step}>
      <div className={styles.top}>
        <h1>{props.details.title}</h1>
        <p>{props.details.date}</p>
      </div>
      <p>{props.details.description}</p>
      <div className={styles.gallery}>
        {props.details.images.map((el) => (
          <img className={styles.galleryImage} src={el} />
        ))}
      </div>
      {isLoaded ? (
        <GoogleMap zoom={10} center={center} mapContainerClassName={styles.map}>
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <h1>Loading...</h1>
      )}
      <button className={styles.editButton}>edit step</button>
    </div>
  )
}
