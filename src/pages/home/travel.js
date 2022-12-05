import React, { useEffect, useState } from "react"
import styles from "./page.module.css"

export default function Travel(props) {
  return (
    <div className={styles.travel}>
      <div className={styles.left}>
        <h1>wycieczka</h1>
        <img
          src={
            "https://media.zielonamapa.pl/images/europa/grecja/zakynthos/zakynthos.jpg"
          }
        />
      </div>
      <p>
        ajadfosij foijaoip fds sgd sg gf s d sd d sdgf dgfgsfda sg afd gdfsgfds
        d gfgfd gsgfd gf ss gfdf g sfgdgfsdfgsd
      </p>
    </div>
  )
}
