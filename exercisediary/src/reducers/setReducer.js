const setReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_SET':
      state = state.concat(action.data)
      return state
    case 'DELETE_SET':
      return state.filter(s => s.id !== action.data.id)
    case 'RESET_SETS':
      state = []
      return state
    default:
      return state
  }
}

export const addSet = (set) => {
  return dispatch => {
    dispatch({
      type: 'NEW_SET',
      data: set
    })
  }
}

export const deleteSet = (set) => {
  return dispatch => {
    dispatch({
      type: 'DELETE_SET',
      data: set
    })
  }
}

export const resetSets = () => {
  return dispatch => {
    dispatch({
      type: 'RESET_SETS'
    })
  }
}

export default setReducer