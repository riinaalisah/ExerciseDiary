import React from 'react'

const DisplayDate = () => {
  const d = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Ovtober', 'November', 'December']
  const date = d.getDate()
  const day = days[d.getDay()]
  const month = months[d.getMonth()]
  const year = d.getFullYear()

  return (
    <div>
      {`${day} ${month} ${date}, ${year}`}
    </div>
  )
}

export default DisplayDate