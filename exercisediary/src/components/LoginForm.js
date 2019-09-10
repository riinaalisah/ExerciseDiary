import React from 'react'

const LoginForm = (props) => {
  const username = props.username
  const password = props.password

  return (
    <div>
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

export default LoginForm