import React from 'react'
import { useField } from '../hooks/useField'
import registrationService from '../services/register'
import { Grid, Header, Form, Input, Button } from 'semantic-ui-react'

const RegistrationForm = (props) => {
  const username = useField('text')
  const firstName = useField('text')
  const lastName = useField('text')
  const password = useField('password')

  const add = async (event) => {
    event.preventDefault()
    const newUser = {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value
    }
    await registrationService.create(newUser)
    props.setUser(newUser)
  }

  return (
    <div>
      <Grid centered columns={3}>
        <Grid.Column>
          <Header as='h1'>Register as a user</Header>
            <Form onSubmit={add}>
              <Form.Field>
                <label>Enter a username:</label>
                <Input icon='user' iconPosition='left'
                  placeholder='Username'
                  type={username.type}
                  value={username.value}
                  onChange={username.onChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Enter your first name:</label>
                <Input icon='user' iconPosition='left'
                  placeholder='First Name'
                  type={firstName.type}
                  value={firstName.value}
                  onChange={firstName.onChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Enter your last name:</label>
                <Input icon='user' iconPosition='left'
                  placeholder='Last Name'
                  type={lastName.type}
                  value={lastName.value}
                  onChange={lastName.onChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Enter your password:</label>
                <Input icon='lock' iconPosition='left'
                  placeholder='Password'
                  type={password.type}
                  value={password.value}
                  onChange={password.onChange}
                />
              </Form.Field>
              <Button type='submit'>Create a user</Button>
            </Form>
        </Grid.Column>
      </Grid>
    </div>
  )

}

export default RegistrationForm