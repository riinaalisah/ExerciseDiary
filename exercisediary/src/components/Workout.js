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
      { workout.type === 'Gym'
        ? <div>
            sets: {workout.sets.map(s => 
              <div key={s.id}>
                {s.move}, {s.sets} x {s.reps}, {s.weights}kg
              </div>)}
          </div>
        : null
      }
    </div>
  )
}

export default Workout