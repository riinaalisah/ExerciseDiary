import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import { initializeExercises } from './reducers/exerciseReducer'
import { initializeWorkouts } from './reducers/workoutReducer'

import ExerciseList from './components/ExerciseList'
import ExerciseForm from './components/ExerciseForm'
import Exercise from './components/Exercise';
import Date from './components/Date'
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';

const App = (props) => {

  useEffect(() => {
    props.initializeExercises()
    props.initializeWorkouts()
  }, [])

  const exerciseById = (id) => 
    props.exercises.find(e => e.id === id)
  
  return (
    <div>
      <Router>

        <div>
          <Link style={{ padding: 5 }} to='/exercises'>exercises</Link>
          <Link style={{ padding: 5 }} to='/exercises/new'>create exercise</Link>
          <Link style={{ padding: 5 }} to='/workouts/'>workouts</Link>
          <Link style={{ padding: 5 }} to='/workouts/new'>add a workout</Link>
          <Date />
        </div>

        <div>
          <Route exact path='/exercises' render={() => <ExerciseList /> } />
          <Route exact path='/exercises/new' render={() => <ExerciseForm /> } />
          <Route exact path='/exercises/:id' render={({ match }) =>
            <Exercise exercise={exerciseById(match.params.id)} />
          } />
          <Route exact path='/workouts' render={() => <WorkoutList /> } />
          <Route exact path='/workouts/new' render={() => <WorkoutForm /> } />
        </div>

      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    exercises: state.exercises
  }
}

export default connect(
  mapStateToProps,
  { initializeExercises,
  initializeWorkouts })(App)