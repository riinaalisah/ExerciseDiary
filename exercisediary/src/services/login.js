import axios from 'axios'
const baseUrl = '/authenticate'

const login = async (username, password) => {
  const url = `${baseUrl}?username=${username}&password=${password}`
  const response = await axios.post(url)
  return response.headers.authorization
}

export default { login }

