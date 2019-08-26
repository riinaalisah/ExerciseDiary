import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/useField'
import { createExercise } from '../reducers/exerciseReducer'

const ExerciseForm = (props) => {
  const name = useField('text')
  const calories = useField('number')

  const createExercise = async (event) => {
    event.preventDefault()
    const newExercise = {
      name: name.value,
      calsPerMinute: calories.value
    }

    try {
      await props.createExercise(newExercise)
      name.reset()
      calories.reset()
    } catch(exception) {
      console.log('ERROR')
    }
    
  }

  return (
    <div>
      <h2>Create a new exercise</h2>
      <form onSubmit={createExercise}>
        <div>
          <label>Name of the exercise</label>
          <input
            type={name.type}
            value={name.value}
            onChange={name.onChange}
          />
        </div>
        <div>
          <label>Calories per minute</label>
          <input
            type={calories.type}
            value={calories.value}
            onChange={calories.onChange}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default connect(null, { createExercise })(ExerciseForm)
