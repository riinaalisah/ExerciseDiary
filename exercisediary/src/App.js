import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import { initializeExercises } from './reducers/exerciseReducer'
import { initializeWorkouts } from './reducers/workoutReducer'
import { loginUser, logoutUser } from './reducers/loginReducer'
import { setAndResetNotification } from './reducers/notificationReducer'
import { useField } from './hooks/useField'

import Date from './components/Date'
import Exercise from './components/Exercise'
import ExerciseForm from './components/ExerciseForm'
import ExerciseList from './components/ExerciseList'
import Workout from './components/Workout'
import WorkoutForm from './components/WorkoutForm'
import WorkoutList from './components/WorkoutList'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

import exerciseService from './services/exercises'
import workoutService from './services/workouts'
import loginService from './services/login'
import userService from'./services/users'


const App = (props) => {

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      props.loginUser(user)
      const token = user.token
      exerciseService.setToken(token)
      workoutService.setToken(token)
      props.initializeExercises()
      props.initializeWorkouts()
    }
  }, [])

  const exerciseById = (id) => 
    props.exercises.find(e => e.id === id)

  const workoutById = (id) =>
    props.workouts.find(w => w.id === id)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const idAndtoken = await loginService.login(username.value, password.value)
      const token = idAndtoken.token
      const u = await userService.getOne(idAndtoken.id)
      const user = {
        ...u,
        token: token
      }
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      props.loginUser(user)
      exerciseService.setToken(token)
      workoutService.setToken(token)
      props.initializeExercises()
      props.initializeWorkouts()
      props.setAndResetNotification({
        message: `Login successful!`,
        type: 'success'
      })
    } catch (exception) {
      props.setAndResetNotification({
        message: 'Invalid username or password',
        type: 'error'
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    props.logoutUser()
  }

  const anonymousView = () => {
    return (
      <div>
        <Link style={{ padding: 5 }} to='/login'>login</Link>
        <Link style={{ padding: 5 }} to='/register'>register</Link>
     </div>
    )
  }
  
  return (
    <div>
      <Router>
        {props.loggedIn === null
          ? anonymousView()
          : <div>
              <Link style={{ padding: 5 }} to='/exercises'>exercises</Link>
              <Link style={{ padding: 5 }} to='/exercises/new'>create exercise</Link>
              <Link style={{ padding: 5 }} to='/workouts/'>workouts</Link>
              <Link style={{ padding: 5 }} to='/workouts/new'>add a workout</Link>
              <button onClick={handleLogout}>log out</button>
              <Date />
              {props.loggedIn.username} logged in
            </div>
        }

        <div>
          <Route exact path='/exercises' render={() => 
            props.loggedIn ? <ExerciseList /> : <Redirect to='/login' /> } />
          <Route exact path='/exercises/new' render={() => 
            props.loggedIn ? <ExerciseForm /> : <Redirect to='/login' /> } />
          <Route exact path='/exercises/:id' render={({ match }) =>
            props.loggedIn
              ? <Exercise exercise={exerciseById(match.params.id)} />
              : <Redirect to='/login' />
          } />
          <Route exact path='/workouts' render={() => 
            props.loggedIn ? <WorkoutList /> : <Redirect to='login' /> } />
          <Route exact path='/workouts/new' render={() => 
            props.loggedIn ? <WorkoutForm />  : <Redirect to='/login' /> } />
          <Route exact path='/workouts/:id' render={({ match }) =>
            props.loggedIn
              ? <Workout workout={workoutById(match.params.id)} />
              : <Redirect to='/login' />
            } />
          <Route exact path='/login' render={() =>
            props.loggedIn
              ? <Redirect to='/' />
              : <LoginForm login={handleLogin}
                  username={username}
                  password={password}
                />
          } />
          <Route exact path='/register' render={() => <RegistrationForm />} />
        </div>

      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    exercises: state.exercises,
    workouts: state.workouts,
    notification: state.notification,
    loggedIn: state.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { initializeExercises,
  initializeWorkouts,
  setAndResetNotification,
  loginUser,
  logoutUser })(App)