import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/useField'
import { createExercise } from '../reducers/exerciseReducer'
import { Grid, Header, Form, Input, Button } from 'semantic-ui-react';

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
      <Grid centered columns={3}>
        <Grid.Column>
          <Header as='h1'>Create a new exercise</Header>
          <Form onSubmit={createExercise}>
            <Form.Field>
              <label>Name of the exercise</label>
              <Input
                type={name.type}
                value={name.value}
                onChange={name.onChange}>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Calories per minute</label>
              <Input
                type={calories.type}
                value={calories.value}
                onChange={calories.onChange}>
              </Input>
            </Form.Field>
            <Button type='submit'>Create</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default connect(null, { createExercise })(ExerciseForm)
