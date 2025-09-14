import './InitialsIcon.css'
import { useState, useRef } from 'react'

const InitialsIcon = ({ visible = false }) => {
  const [isPressed, setIsPressed] = useState(false)
  const touchStartY = useRef(0)
  const touchStartTime = useRef(0)
  const lastScrollTime = useRef(0)

  const handleClick = () => {
    const now = Date.now()
    // Prevent rapid successive scroll-to-top calls (debounce)
    if (now - lastScrollTime.current < 1000) {
      return
    }
    
    lastScrollTime.current = now
    // Only scroll to top on intentional click, not accidental touch during scrolling
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
    touchStartTime.current = Date.now()
    setIsPressed(true)
  }

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY
    const touchDuration = Date.now() - touchStartTime.current
    const touchDistance = Math.abs(touchEndY - touchStartY.current)
    
    // Only trigger click if it's a very short, stationary touch (not a scroll gesture)
    // Much stricter criteria to prevent accidental scroll-to-top during scrolling
    if (touchDuration < 200 && touchDistance < 8) {
      handleClick()
    }
    
    setIsPressed(false)
  }

  const handleTouchMove = (e) => {
    // Cancel the press state if user is scrolling
    setIsPressed(false)
    // Prevent the touch from interfering with page scrolling
    e.preventDefault()
  }

  return (
    <div 
      className={`initials-icon ${visible ? 'fade-in' : ''} ${isPressed ? 'pressed' : ''}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      BC
    </div>
  )
}

export default InitialsIcon