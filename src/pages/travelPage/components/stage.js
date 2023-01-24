import React from "react"

export default function Stage(props) {
  const { name, images, atractionName, title, description, cost } = props.data

  if (name === "images") {
    return (
      <div>
        <h1>Title</h1>
        {images?.map((el, i) => (
          <img
            key={i}
            src={el || "https://cezim.pl/wp-content/uploads/2021/12/empty.jpg"}
          />
        ))}
      </div>
    )
  } else if (name === "description") {
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>{title}</h1>
        <p>atraction: {atractionName}</p>
        <p>cost: {cost}</p>
        {images && <img alt="image" src={images[0]} />}
      </div>
    )
  }
}
