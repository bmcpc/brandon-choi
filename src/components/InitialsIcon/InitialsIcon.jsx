import { useState, useEffect } from 'react'
import './InitialsIcon.css'

const InitialsIcon = ({ visible = false }) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div 
      className={`initials-icon ${visible ? 'fade-in' : ''}`}
      onClick={handleClick}
    >
      BC
    </div>
  )
}

export default InitialsIcon