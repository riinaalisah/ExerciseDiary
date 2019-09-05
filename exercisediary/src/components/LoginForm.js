import React from 'react'
import { useField } from '../hooks/useField'
import loginService from '../services/login'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      console.log('LOGGED IN USER: ', user)

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      loginService.setToken(user.token)
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