import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import exerciseReducer from './reducers/exerciseReducer'
import workoutReducer from './reducers/workoutReducer'
import setReducer from './reducers/setReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  exercises: exerciseReducer,
  workouts: workoutReducer,
  sets: setReducer,
  users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store