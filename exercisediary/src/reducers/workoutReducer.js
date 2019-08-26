import workoutService from '../services/workouts'

const workoutReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_WORKOUTS':
      state = action.data
      return state
    case 'NEW_WORKOUT':
      return state.concat(action.data)
    case 'DELETE_WORKOUT':
      return state
    default:
      return state
  }
}

export const initializeWorkouts = () => {
  return async dispatch => {
    const workouts = await workoutService.getAll()
    dispatch({
      type: 'INIT_WORKOUTS',
      data: workouts
    })
  }
}

export const addWorkout = (workoutObject) => {
  return async dispatch => {
    const newWorkout = await workoutService.create(workoutObject)
    dispatch({
      type: 'NEW_WORKOUT',
      data: newWorkout
    })
  }
}

export const deleteWorkout = (workoutObject) => {
  return async dispatch => {
    await workoutService.remove(workoutObject)
    dispatch({
      type: 'DELETE_WORKOUT'
    })
  }
}

export default workoutReducer