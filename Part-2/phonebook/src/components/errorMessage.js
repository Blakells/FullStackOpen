import React from 'react'

const Notification = ({ message }) => {
if (message.length < 1) {
  return null
}
return (
  <div className='error'>
    {message}
  </div>
)
}

export default Notification;