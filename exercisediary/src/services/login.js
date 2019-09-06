import axios from 'axios'
const baseUrl = '/api/authenticate'

let token = null

const setToken = (newToken) => {
  token = newToken
}

const getToken = () => {
  return token
}

const login = async (username, password) => {
  const url = `${baseUrl}?username=${username}&password=${password}`
  const response = await axios.post(url)
  setToken(response.headers.authorization)
  //return response.data
}

export default { login, setToken, getToken }

