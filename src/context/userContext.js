import React, { useState, useEffect } from "react"
const UserContext = React.createContext()

function UserContextProvider(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  // const [user, setUser] = useState({ userId: 0, userName: "Guest" })
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }
