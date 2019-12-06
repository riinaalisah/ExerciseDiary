import React from 'react'
import { connect } from 'react-redux'
import Notification from './Notification'
import { Header, Form, Button, Grid, Input } from 'semantic-ui-react';

const LoginForm = (props) => {
  const username = props.username
  const password = props.password

  return (
    <div>
      <Grid centered columns={3}>
        <Grid.Column>
          <Notification type={props.notification.type} message={props.notification.message} />
          <Header as='h1'>Login</Header>
            <Form onSubmit={props.login}>
              <Form.Field>
                <label>Enter your username:</label>
                <Input icon='user' iconPosition='left'
                  placeholder='Username'
                  type={username.type}
                  value={username.value}
                  onChange={username.onChange}
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
              <Button type='submit'>Login</Button>
            </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(LoginForm)

/*
<Notification type={props.notification.type} message={props.notification.message} />
      <h3>Login</h3>
      <form onSubmit={props.login}>
        <div>
          <label>username:</label>
          <input
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
          <label>password:</label>
          <input
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <button type='submit'>log in</button>
      </form>
      */