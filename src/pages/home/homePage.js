import React, { useEffect, useState } from "react"
import Travel from "./travel"
import SideBar from "../../components/SideBar"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.page}>
      <SideBar />
      <div className={styles.content}>
        <h1 className={styles.text}>Places I've been to...</h1>
        <div className={styles.travels}>
          <Travel />
          <Travel />
          <Travel />
          <Travel />
          <Travel />
        </div>
        <button className={styles.add}>+</button>
      </div>
    </div>
  )
}
