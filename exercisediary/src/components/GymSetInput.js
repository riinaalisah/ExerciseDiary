import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/useField'
import { addSet, deleteSet } from '../reducers/setReducer'

const GymSetInput = (props) => {
  const [show, setShow] = useState(true)
  
  const id = props.id
  const move = useField('text')
  const sets = useField('number')
  const reps = useField('number')
  const weights = useField('number')

  if (show === false) {
    return null
  }

  const addSet = () => {
    const set = {
      id: id,
      move: move.value,
      sets: sets.value,
      reps: reps.value,
      weights: weights.value
    }
    props.addSet(set)
  }

  const deleteSet = () => {
    const set = {
      id: id,
      move: move.value,
      sets: sets.value,
      reps: reps.value,
      weights: weights.value
    }
    props.deleteSet(set)
    setShow(false)
  }

  return (
    <div id={id}>
      <label>move</label>
      <input
        type={move.type}
        value={move.value}
        onChange={move.onChange}
      />
      <label>sets</label>
       <input
        type={sets.type}
        value={sets.value}
        onChange={sets.onChange}
      />
      <label>repetitions</label>
      <input  
        type={reps.type}
        value={reps.value}
        onChange={reps.onChange}
      />
      <label>weigths (kg)</label>
      <input
        type={weights.type}
        value={weights.value}
        onChange={weights.onChange}
      />
      <button type='button' onClick={addSet}>ok</button>
      <button type='button' onClick={deleteSet}>delete</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sets: state.sets
  }
}

export default connect(mapStateToProps, { addSet, deleteSet })(GymSetInput)