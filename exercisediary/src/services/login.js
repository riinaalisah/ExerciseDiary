import axios from 'axios'
const baseUrl = '/api/authenticate'

let token = null

const setToken = (newToken) => {
  token = newToken
}

const getToken = () => {
  return token
}

const login = async (credentials) => {
  const url = `${baseUrl}?username=${credentials.username}&password=${credentials.password}`
  const response = await axios.post(url)
  setToken(response.headers.authorization)
  return response.data
}

export default { login, setToken, getToken }

