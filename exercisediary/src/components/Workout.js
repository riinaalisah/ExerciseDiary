import React from 'react'

const Workout = ({ workout }) => {
  
  if (!workout) {
    return null
  }

  return (
    <div>
      <h3>{workout.type}</h3>
      <div>
        user: {workout.user.username}
      </div>
      <div>
        date: {workout.date.substring(0, 10)}
      </div>
      <div>
        duration: {workout.duration} minutes
      </div>
      
    </div>
  )
}

export default Workout