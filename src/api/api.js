import axios from "axios"

const api = axios.create({
  baseURL: "https://fe-travel-records.azurewebsites.net/api",
})

export default api
