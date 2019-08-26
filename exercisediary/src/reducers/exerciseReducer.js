import exerciseService from '../services/exercises'

const exerciseReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_EXERCISES':
      state = action.data
      return state
    case 'NEW_EXERCISE':
      return state.concat(action.data)
    case 'DELETE_EXERCISE':
      return state
    default:
      return state
  }
}

export const initializeExercises = () => {
  return async dispatch => {
    const exercises = await exerciseService.getAll()
    dispatch({
      type: 'INIT_EXERCISES',
      data: exercises
    })
  }
}

export const createExercise = (exerciseObject) => {
  return async dispatch => {
    const newExercise = await exerciseService.create(exerciseObject)
    dispatch({
      type: 'NEW_EXERCISE',
      data: newExercise
    })
  }
}

export const deleteExercise = (exerciseObject) => {
  return async dispatch => {
    await exerciseService.remove(exerciseObject)
    dispatch({
      type: 'DELETE_EXERCISE'
    })
  }
}

export default exerciseReducer