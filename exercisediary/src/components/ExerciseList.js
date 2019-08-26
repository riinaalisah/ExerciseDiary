import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const ExerciseList = (props) => {

  return (
    <div>
      <h2>Exercises</h2>
      <table>
        <tbody>
          <tr>
            <th>Exercise</th>
            <th>Cals/minute</th>
          </tr>
          {props.exercises.map(e => 
            <tr key={e.id}>
              <td>
                <Link style={{ padding: 5 }} to={`/exercises/${e.id}`}>
                  {e.name}
                </Link>
              </td>
              <td>{e.calsPerMinute}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    exercises: state.exercises
  }
}

export default connect(
  mapStateToProps)(ExerciseList)
