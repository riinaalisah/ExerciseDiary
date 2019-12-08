import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import exerciseReducer from './reducers/exerciseReducer'
import workoutReducer from './reducers/workoutReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  exercises: exerciseReducer,
  workouts: workoutReducer,
  notification: notificationReducer,
  loggedIn: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store