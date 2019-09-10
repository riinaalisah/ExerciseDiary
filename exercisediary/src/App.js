import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import { initializeExercises } from './reducers/exerciseReducer'
import { initializeWorkouts } from './reducers/workoutReducer'

import ExerciseList from './components/ExerciseList'
import ExerciseForm from './components/ExerciseForm'
import Exercise from './components/Exercise'
import Date from './components/Date'
import WorkoutList from './components/WorkoutList'
import WorkoutForm from './components/WorkoutForm'
import Workout from './components/Workout'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import loginService from './services/login'
import { useField } from './hooks/useField'
import exerciseService from './services/exercises'
import workoutService from './services/workouts'

const App = (props) => {

  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      const token = user.token
      exerciseService.setToken(token)
      workoutService.setToken(token)
    }
  }, [])

  useEffect(() => {
    props.initializeExercises()
    props.initializeWorkouts()
  }, [])

  const exerciseById = (id) => 
    props.exercises.find(e => e.id === id)

  const workoutById = (id) =>
    props.workouts.find(w => w.id === id)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const token = await loginService.login(username.value, password.value)
      const user = {
        username: username.value,
        token: token
      }
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      exerciseService.setToken(token)
      workoutService.setToken(token)
    } catch (exception) {
      console.log('ERROR', exception.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
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
        {user === null
          ? anonymousView()
          : <div>
              <Link style={{ padding: 5 }} to='/exercises'>exercises</Link>
              <Link style={{ padding: 5 }} to='/exercises/new'>create exercise</Link>
              <Link style={{ padding: 5 }} to='/workouts/'>workouts</Link>
              <Link style={{ padding: 5 }} to='/workouts/new'>add a workout</Link>
              <button onClick={handleLogout}>log out</button>
              <Date />
              {user.username} logged in
            </div>
        }

        <div>
          <Route exact path='/exercises' render={() => <ExerciseList /> } />
          <Route exact path='/exercises/new' render={() => <ExerciseForm /> } />
          <Route exact path='/exercises/:id' render={({ match }) =>
            <Exercise exercise={exerciseById(match.params.id)} />
          } />
          <Route exact path='/workouts' render={() => <WorkoutList /> } />
          <Route exact path='/workouts/new' render={() => <WorkoutForm /> } />
          <Route exact path='/workouts/:id' render={({ match }) =>
            <Workout workout={workoutById(match.params.id)} />
          } />
          <Route exact path='/login' render={() =>
            <LoginForm login={handleLogin}
            username={username}
            password={password} />}
          />
          <Route exact path='/register' render={() => <RegistrationForm />} />
        </div>

      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    exercises: state.exercises,
    workouts: state.workouts
  }
}

export default connect(
  mapStateToProps,
  { initializeExercises,
  initializeWorkouts })(App)