import React from 'react'
import { useField } from '../hooks/useField'
import loginService from '../services/login'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const login = async (event) => {
    event.preventDefault()
    try {
      await loginService.login(username.value, password.value)

      console.log('LOGGED IN USER: ', username.value)

      window.localStorage.setItem('loggedInUser', username.value)
    } catch (exception) {
      console.log('ERROR', exception.message)
    }
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={login}>
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