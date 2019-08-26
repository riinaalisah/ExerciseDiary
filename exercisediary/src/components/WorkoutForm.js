import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addWorkout } from '../reducers/workoutReducer'
import { useField } from '../hooks/useField'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Select from 'react-select'

const WorkoutForm = (props) => {

  const [selected, setSelected] = useState(null)
  const [date, setDate] =  useState(new Date())
  const duration = useField('number')


  if (!props.exercises) {
    return null
  }

  const handleDateChange = (date) => {
    setDate(date)
  }
  
  const handleSelectedChange = (selected) => {
    setSelected(selected)
  }

  const options = 
    props.exercises.map(e => {
      return {
        label: e.name
      }
    })
    
    
  const addWorkout = async (event)  => {
    event.preventDefault()
    const newWorkout = {
      type: selected.label,
      date: date,
      duration: duration.value
    }

    try {
      await props.addWorkout(newWorkout)
      setSelected(null)
      setDate(new Date())
      duration.reset()
    } catch(exception) {
      console.log('ERROR:', exception.message)
    }
  }

  return (
    <div>
      <h2>Add a new workout</h2>
      <form onSubmit={addWorkout}>
        <div>
          <label>workout type</label>
          <Select
            options={options}
            value={selected}
            onChange={handleSelectedChange}
          />
        </div>
        <div>
          <label>date</label>
          <DatePicker
            placeholderText="Click to select a date"
            selected={date}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label>duration (minutes)</label>
          <input
            type={duration.type}
            value={duration.value}
            onChange={duration.onChange}
          />
        </div>
        <button type='submit'>add</button>
      </form>
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
  { addWorkout }
  )(WorkoutForm)