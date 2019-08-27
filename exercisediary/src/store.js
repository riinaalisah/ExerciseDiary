import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import exerciseReducer from './reducers/exerciseReducer'
import workoutReducer from './reducers/workoutReducer'
import setReducer from './reducers/setReducer';

const reducer = combineReducers({
  exercises: exerciseReducer,
  workouts: workoutReducer,
  sets: setReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store