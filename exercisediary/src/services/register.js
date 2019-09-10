import axios from 'axios'
const baseUrl = '/register'

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default { create }

