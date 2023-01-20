import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { UserContextProvider } from "./context/userContext"
import { ParallaxProvider, useParallax } from "react-scroll-parallax"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <UserContextProvider>
    <ParallaxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ParallaxProvider>
  </UserContextProvider>
)
