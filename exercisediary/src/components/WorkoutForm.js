import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addWorkout } from '../reducers/workoutReducer'
import { useField } from '../hooks/useField'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Grid, Header, Form, Button, Input, Dropdown } from 'semantic-ui-react';

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
  
  const handleSelectedChange = (event, {value}) => {
    setSelected(value)
  }

  // added exercise types
  const options = 
    props.exercises.map(e => {
      return {
        key: e.name,
        value: e.name,
        text: e.name
      }
    })

  const addWorkout = async (event)  => {
    event.preventDefault()

    const newWorkout = {
      type: selected,
      date: date,
      duration: duration.value,
      user: props.user
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
      <Grid centered columns={3}>
        <Grid.Column>
          <Header as='h1'>Add a new workout</Header>
          <Form onSubmit={addWorkout}>
            <Form.Field>
              <label>Workout type</label>
              <Dropdown 
                placeholder='Select exercise'
                selection
                options={options}
                onChange={handleSelectedChange}
              />
            </Form.Field>
            <Form.Field>
              <label>date</label>
              <DatePicker
                placeholderText="Click to select a date"
                selected={date}
                onChange={handleDateChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Duration (minutes)</label>
              <Input
                type={duration.type}
                value={duration.value}
                onChange={duration.onChange}
              />
            </Form.Field>
            <Button type='submit'>Add</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    exercises: state.exercises,
    user: state.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { addWorkout }
  )(WorkoutForm)