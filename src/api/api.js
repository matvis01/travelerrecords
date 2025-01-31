import axios from "axios"

const api = axios.create({
  baseURL: "https://localhost:7263/api",
})

export const addAuthToken = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
}

export default api
