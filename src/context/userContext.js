import React, { useState } from "react"
const UserContext = React.createContext()

function UserContextProvider(props) {
  const [user, setUser] = useState({
    userId: 0,
    imageId: 0,
    username: "",
    password: "",
    email: "",
    bio: "",
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }
