import React from 'react'

const SuccessNotification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div style={{ color: 'green' }}>
      SUCCESS: {props.message}
    </div>
  )
}

export default SuccessNotification