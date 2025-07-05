import { useState, useEffect } from 'react'

const TypeWriter = ({ strings, speed = 100, deleteSpeed = 50, delayBetweenStrings = 1000 }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionData, setTransitionData] = useState(null)

  // Helper function to find common prefix (character-based)
  const findCommonPrefix = (str1, str2) => {
    let i = 0
    while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
      i++
    }
    return i
  }

  // Helper function to find common suffix (character-based)
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
          // Smart transition - calculate edit positions
          const deleteStartPos = prefixLength
          const deleteEndPos = currentText.length - suffixLength
          const insertText = nextString.substring(prefixLength, nextString.length - suffixLength)
          
          setIsTransitioning(true)
          setTransitionData({
            deleteStartPos,
            deleteEndPos,
            insertText,
            targetCursorPos: deleteStartPos,
            phase: 'movingCursor',
            insertIndex: 0
          })
        } else {
          // No common parts, use regular deletion
          setIsDeleting(true)
        }
        setIsPaused(false)
        return
      }

      if (isTransitioning && transitionData) {
        // Handle smart transition with cursor movement and character-by-character editing
        const { deleteStartPos, deleteEndPos, insertText, targetCursorPos, phase, insertIndex } = transitionData
        
        if (phase === 'movingCursor') {
          // Move cursor to the edit position
          if (cursorPosition > targetCursorPos) {
            // Move cursor left
            setCursorPosition(cursorPosition - 1)
          } else if (cursorPosition < targetCursorPos) {
            // Move cursor right
            setCursorPosition(cursorPosition + 1)
          } else {
            // Cursor is at target position, start deleting
            setTransitionData({
              ...transitionData,
              phase: 'deleting'
            })
          }
        } else if (phase === 'deleting') {
          // Delete characters one by one from the cursor position
          if (currentText.length > deleteStartPos && cursorPosition < deleteEndPos) {
            const newText = currentText.slice(0, cursorPosition) + currentText.slice(cursorPosition + 1)
            setCurrentText(newText)
            // Update deleteEndPos since text is now shorter
            setTransitionData({
              ...transitionData,
              deleteEndPos: deleteEndPos - 1
            })
          } else {
            // Done deleting, start inserting
            setTransitionData({
              ...transitionData,
              phase: 'inserting'
            })
          }
        } else if (phase === 'inserting') {
          // Insert characters one by one
          if (insertIndex < insertText.length) {
            const charToInsert = insertText[insertIndex]
            const newText = currentText.slice(0, cursorPosition) + charToInsert + currentText.slice(cursorPosition)
            setCurrentText(newText)
            setCursorPosition(cursorPosition + 1)
            setTransitionData({
              ...transitionData,
              insertIndex: insertIndex + 1
            })
          } else {
            // Done inserting, transition complete
            setIsTransitioning(false)
            setTransitionData(null)
            setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
            setCursorPosition(nextString.length)
          }
        }
      } else if (isDeleting) {
        // Regular character-by-character backspacing
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
          setCursorPosition(Math.max(0, cursorPosition - 1))
        } else {
          // Move to next string
          setIsDeleting(false)
          setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
          setCursorPosition(0)
        }
      } else {
        // Regular character-by-character typing
        if (currentText.length < currentString.length) {
          setCurrentText(currentString.slice(0, currentText.length + 1))
          setCursorPosition(currentText.length + 1)
        } else {
          // Pause before starting transition
          setIsPaused(true)
        }
      }
    }, isPaused ? delayBetweenStrings : 
        isTransitioning ? (transitionData?.phase === 'deleting' || transitionData?.phase === 'inserting' ? deleteSpeed : speed * 0.5) :
        isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timer)
  }, [currentText, currentStringIndex, isDeleting, isPaused, isTransitioning, transitionData, strings, speed, deleteSpeed, delayBetweenStrings, cursorPosition])

  // Render text with cursor at the correct position
  const renderTextWithCursor = () => {
    const beforeCursor = currentText.slice(0, cursorPosition)
    const afterCursor = currentText.slice(cursorPosition)
    
    return (
      <>
        {beforeCursor}
        <span className="cursor">|</span>
        {afterCursor}
      </>
    )
  }

  return (
    <span className="typewriter">
      {renderTextWithCursor()}
    </span>
  )
}

export default TypeWriter