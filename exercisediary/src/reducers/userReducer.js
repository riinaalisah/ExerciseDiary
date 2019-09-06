import userService from '../services/users'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'NEW_USER':
      state = action.data
      return state
    case 'SET_USER':
      state = action.data
      return state
    default:
      return state
  }
}

export const addUser = (userObject) => {
  return async dispatch => {
    const newUser = await userService.create(userObject)
    dispatch({
      type: 'NEW_USER',
      data: newUser
    })
  }
}

export const setUser = (userObject) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: userObject
    })
  }
}

export default userReducer