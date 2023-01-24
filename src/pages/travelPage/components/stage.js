import React from "react"
import styles from "./components.module.css"

export default function Stage(props) {
  if (props.name == "images") {
    return (
      <div className={styles.gallery}>
        <h1>Title</h1>
        {props.images.map((el) => (
          <img className={styles.galleryImage} src={el} />
        ))}
      </div>
    )
  } else if (props.name == "atraction") {
    return (
      <div>
        <h1>Title</h1>
        <p>
          descriptionnb dgsonad soidnf oindasfgoi ansdoi dfgnioasdfn olisdn
          oinsdoind fkjbndfsgkjndasfgoij asdoifj oisadfjoisdhoidsfh oiuasdgh
          oiusnbd gfiusdh oisahbfigdu b
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Title</h1>
        <p>atraction: name</p>
        <p>cost: 419.68</p>
        <img src={props.images[0]} />
      </div>
    )
  }
}
