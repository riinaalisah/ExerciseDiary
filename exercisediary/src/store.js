import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import exerciseReducer from './reducers/exerciseReducer'
import workoutReducer from './reducers/workoutReducer'

const reducer = combineReducers({
  exercises: exerciseReducer,
  workouts: workoutReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store