import axios from 'axios'
const baseUrl = '/exercises'

let token = null
let config = null

const setToken = (newToken) => {
  token = newToken
  setConfig()
}

const setConfig = () => {
  config = {
    headers: { authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedObject) => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}

const remove = async (objectToDelete) => {
  const response = await axios.delete(`${baseUrl}/${objectToDelete.id}`)
  return response.data
}

export default { getAll, getOne, create, update, remove, setToken }