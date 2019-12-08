import React, { useEffect } from 'react'
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
import { Menu, Button } from 'semantic-ui-react';


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
        <Menu>
          <Menu.Item as={Link} to='/login'>Login</Menu.Item>
          <Menu.Item as={Link} to='/register'>Register</Menu.Item>
        </Menu>
     </div>
    )
  }
  
  return (
    <div>
      <Router>
        {props.loggedIn === null
          ? anonymousView()
          : <div>
              <Menu>
                <Menu.Item as={Link} to='/exercises'>Exercises</Menu.Item>
                <Menu.Item as={Link} to='/exercises/new'>Create new exercises</Menu.Item>
                <Menu.Item as={Link} to='/workouts'>Workouts</Menu.Item>
                <Menu.Item as={Link} to='/workouts/new'>Add a workout</Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item><Date /></Menu.Item>
                  <Menu.Item>{props.loggedIn.username} logged in</Menu.Item>
                  <Menu.Item><Button onClick={handleLogout}>Logout</Button></Menu.Item>
                </Menu.Menu>
              </Menu>
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