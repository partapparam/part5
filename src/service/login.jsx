import axios from "axios"
const baseURL = "http://localhost:3002/api/login"

const login = async (credentials) => {
  const response = await axios.post(baseURL, credentials)
  return response.data
}

export default { login }
