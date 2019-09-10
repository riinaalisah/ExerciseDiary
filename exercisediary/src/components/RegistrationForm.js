import React from 'react'
import { useField } from '../hooks/useField'
import registrationService from '../services/register'

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
      <h3>Registration</h3>
      <form onSubmit={add}>
        <div>
          <label>username:</label>
          <input
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
          <label>first name:</label>
          <input
            type={firstName.type}
            value={firstName.value}
            onChange={firstName.onChange}
          />
        </div>
        <div>
          <label>last name:</label>
          <input
            type={lastName.type}
            value={lastName.value}
            onChange={lastName.onChange}
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
        <button tyoe='submit'>create user</button>
      </form>
    </div>
  )

}

export default RegistrationForm