import { useState, useEffect } from 'react'

const TypeWriter = ({ strings, speed = 100, deleteSpeed = 50, delayBetweenStrings = 1000 }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionData, setTransitionData] = useState(null)

  // Helper function to find common prefix
  const findCommonPrefix = (str1, str2) => {
    let i = 0
    while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
      i++
    }
    return i
  }

  // Helper function to find common suffix
  const findCommonSuffix = (str1, str2, prefixLength) => {
    let i = 0
    const maxSuffixLength = Math.min(str1.length - prefixLength, str2.length - prefixLength)
    while (i < maxSuffixLength && 
           str1[str1.length - 1 - i] === str2[str2.length - 1 - i]) {
      i++
    }
    return i
  }

  useEffect(() => {
    if (!strings || strings.length === 0) return

    const currentString = strings[currentStringIndex]
    const nextString = strings[(currentStringIndex + 1) % strings.length]
    
    const timer = setTimeout(() => {
      if (isPaused) {
        // Start transition to next string
        const prefixLength = findCommonPrefix(currentText, nextString)
        const suffixLength = findCommonSuffix(currentText, nextString, prefixLength)
        
        if (prefixLength > 0 || suffixLength > 0) {
          // Smart transition - only change the differing part
          const oldMiddle = currentText.substring(prefixLength, currentText.length - suffixLength)
          const newMiddle = nextString.substring(prefixLength, nextString.length - suffixLength)
          
          setIsTransitioning(true)
          setTransitionData({
            prefix: currentText.substring(0, prefixLength),
            suffix: currentText.substring(currentText.length - suffixLength),
            oldMiddle,
            newMiddle,
            currentMiddle: oldMiddle,
            phase: oldMiddle.length > 0 ? 'deleting' : 'typing'
          })
        } else {
          // No common parts, use regular deletion
          setIsDeleting(true)
        }
        setIsPaused(false)
        return
      }

      if (isTransitioning && transitionData) {
        // Handle smart transition
        const { prefix, suffix, newMiddle, currentMiddle, phase } = transitionData
        
        if (phase === 'deleting' && currentMiddle.length > 0) {
          // Delete one character from the middle
          const newCurrentMiddle = currentMiddle.slice(0, -1)
          setTransitionData({
            ...transitionData,
            currentMiddle: newCurrentMiddle,
            phase: newCurrentMiddle.length === 0 ? 'typing' : 'deleting'
          })
          setCurrentText(prefix + newCurrentMiddle + suffix)
        } else if (phase === 'typing' && currentMiddle.length < newMiddle.length) {
          // Type one character into the middle
          const newCurrentMiddle = newMiddle.substring(0, currentMiddle.length + 1)
          setTransitionData({
            ...transitionData,
            currentMiddle: newCurrentMiddle,
            phase: newCurrentMiddle.length === newMiddle.length ? 'complete' : 'typing'
          })
          setCurrentText(prefix + newCurrentMiddle + suffix)
        } else {
          // Transition complete
          setIsTransitioning(false)
          setTransitionData(null)
          setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
        }
      } else if (isDeleting) {
        // Regular backspacing
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Move to next string
          setIsDeleting(false)
          setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
        }
      } else {
        // Regular typing
        if (currentText.length < currentString.length) {
          setCurrentText(currentString.slice(0, currentText.length + 1))
        } else {
          // Pause before starting transition
          setIsPaused(true)
        }
      }
    }, isPaused ? delayBetweenStrings : 
        isTransitioning ? (transitionData?.phase === 'deleting' ? deleteSpeed : speed) :
        isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timer)
  }, [currentText, currentStringIndex, isDeleting, isPaused, isTransitioning, transitionData, strings, speed, deleteSpeed, delayBetweenStrings])

  return (
    <span className="typewriter">
      {currentText}
      <span className="cursor">|</span>
    </span>
  )
}

export default TypeWriter