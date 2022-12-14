import axios from "axios"

const api = axios.create({
  baseURL: "https://travel-records-backend.azurewebsites.net/api",
  // baseURL: "https://localhost:7263/api",
})

export default api
