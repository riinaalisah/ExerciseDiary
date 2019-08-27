import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addWorkout } from '../reducers/workoutReducer'
import { useField } from '../hooks/useField'
import { resetSets } from '../reducers/setReducer'
import setService from '../services/sets'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Select from 'react-select'
import GymSetInput from './GymSetInput'

const WorkoutForm = (props) => {

  const [selected, setSelected] = useState(null)
  const [date, setDate] =  useState(new Date())
  const duration = useField('number')

  const [inputs, setInputs] = useState([<GymSetInput key={0} id={Math.random()} />])

  if (!props.exercises) {
    return null
  }

  const handleDateChange = (date) => {
    setDate(date)
  }
  
  const handleSelectedChange = (selected) => {
    setSelected(selected)
  }

  const gymSetInfo = () => 
    <div>
      {inputs}
      <button type='button' onClick={addInput}>add a set</button>
    </div>

  const addInput = () => {
    setInputs(inputs.concat(<GymSetInput key={inputs.length} id={Math.random()} />))
  }

  const options = 
    props.exercises.map(e => {
      return {
        label: e.name
      }
    })

  const addWorkout = async (event)  => {
    event.preventDefault()
    const setObjects = await Promise.all(props.sets.map(s => {
      delete s.id
      return setService.create(s)
    }))

    const newWorkout = {
      type: selected.label,
      date: date,
      duration: duration.value,
      sets: setObjects
    }

    try {
      await props.addWorkout(newWorkout)
      setSelected(null)
      setDate(new Date())
      duration.reset()
      props.resetSets()
      setInputs(<GymSetInput key={0} />)
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
        { selected && selected.label === 'Gym'
          ? gymSetInfo()
          : null
        }
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
    exercises: state.exercises,
    sets: state.sets
  }
}

export default connect(
  mapStateToProps,
  { addWorkout,
  resetSets }
  )(WorkoutForm)