import React from 'react'

const ErrorNotification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      ERROR: {props.message}
    </div>
  )
}

export default ErrorNotification