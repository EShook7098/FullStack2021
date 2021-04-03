import React from 'react'
import './notification.css'

const Notification = ({message, type}) => {
  if(message === null)
   return null

  return (
    <div className={type}>
      <span>{message}</span>
    </div>
  )
}

export default Notification