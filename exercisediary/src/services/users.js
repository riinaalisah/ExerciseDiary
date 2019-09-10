import axios from 'axios'
const baseUrl = '/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

// is this needed?
const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  console.log(response.data)
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

export default { getAll, getOne, create, update, remove }