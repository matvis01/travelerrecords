import React from "react"
import styles from "./components.module.css"

export default function ExpandedStep(props) {
  return (
    <div className={styles.step}>
      <div className={styles.top}>
        <h1>Rhodes</h1>
        <p>28 december 22</p>
      </div>
      <p>
        ojdfao noda nfona od oiad oa oifoaof nk o ngnoi o ioi doasnkjnf lan
        fdlkdf ladf lka sladsfn lgn ldfs lkdfslf df djas l fln l nfdlk dnff jdfa
        jljlkdsnlkfbnlkzjfgd
      </p>
      <div className={styles.gallery}>
        <img
          className={styles.galleryImage}
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/81/2f/1e/caption.jpg?w=700&h=-1&s=1&cx=3705&cy=1254&chk=v1_660f815f73069c16e175"
        />
        <img
          className={styles.galleryImage}
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/81/2f/1e/caption.jpg?w=700&h=-1&s=1&cx=3705&cy=1254&chk=v1_660f815f73069c16e175"
        />
      </div>
      <img
        className={styles.map}
        src="https://media.istockphoto.com/id/1137117479/vector/city-urban-streets-roads-abstract-map.jpg?s=612x612&w=0&k=20&c=QXajx6ZG-OmfLmwmKkeCA03rcFPuFHmSTtCpJYiDFSo="
      />
      <button className={styles.editButton}>edit step</button>
    </div>
  )
}
