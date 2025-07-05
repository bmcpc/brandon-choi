import { useState, useEffect } from 'react'

const TypeWriter = ({ strings, speed = 100, deleteSpeed = 50, delayBetweenStrings = 1000 }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!strings || strings.length === 0) return

    const currentString = strings[currentStringIndex]
    
    const timer = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false)
        setIsDeleting(true)
        return
      }

      if (isDeleting) {
        // Backspacing
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Move to next string
          setIsDeleting(false)
          setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
        }
      } else {
        // Typing
        if (currentText.length < currentString.length) {
          setCurrentText(currentString.slice(0, currentText.length + 1))
        } else {
          // Pause before starting to delete
          setIsPaused(true)
        }
      }
    }, isPaused ? delayBetweenStrings : isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timer)
  }, [currentText, currentStringIndex, isDeleting, isPaused, strings, speed, deleteSpeed, delayBetweenStrings])

  return (
    <span className="typewriter">
      {currentText}
      <span className="cursor">|</span>
    </span>
  )
}

export default TypeWriter