import React from 'react'
import SuccessNotification from './SuccessNotification'
import ErrorNotification from './ErrorNotification'
import { Message } from 'semantic-ui-react';

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  if (props.type === 'success') {
    return (
      <Message positive>
        <Message.Header>{props.message}</Message.Header>
      </Message>
    )
  }

  if (props.type === 'error') {
    return (
      <Message error>
        <Message.Header>{props.message}</Message.Header>
      </Message>
    )
  }

  return null
}

export default Notification