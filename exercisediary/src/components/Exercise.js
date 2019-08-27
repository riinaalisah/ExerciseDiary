import React from 'react'

const Exercise = ({ exercise }) => {
  if (!exercise) {
    return null
  }

  return (
    <div>
      <div>
        <h2>{exercise.name}</h2>
      </div>
      <div>
        Calories per minute: {exercise.calsPerMinute}
      </div>     
    </div>
  )
}

export default Exercise