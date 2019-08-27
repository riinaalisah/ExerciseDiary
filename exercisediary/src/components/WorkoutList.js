import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const WorkoutList = (props) => {
  if (!props.workouts) {
    return null
  }

  return (
    <div>
      <h2>Workouts</h2>
      <table>
        <tbody>
          <tr>
            <th>workout type</th>
            <th>date</th>
            <th>duration</th>
          </tr>
          {props.workouts.map(w => 
            <tr key={w.id}>
              <td>
                <Link style={{ padding: 5 }} to={`/workouts/${w.id}`}>
                  {w.type}
                </Link>
              </td>
              <td>{w.date.substring(0, 10)}</td>
              <td>{w.duration}min</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts
  }
}

export default connect(mapStateToProps)(WorkoutList)
