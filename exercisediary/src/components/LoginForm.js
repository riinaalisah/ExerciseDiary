import React from 'react'
import { connect } from 'react-redux'
import Notification from './Notification'

const LoginForm = (props) => {
  const username = props.username
  const password = props.password

  return (
    <div>
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
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(LoginForm)