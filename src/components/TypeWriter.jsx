import { useState, useEffect } from 'react'

const TypeWriter = ({ strings, speed = 100, deleteSpeed = 50, delayBetweenStrings = 1000 }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionData, setTransitionData] = useState(null)

  // Helper function to split text into words
  const getWords = (text) => {
    return text.split(' ').filter(word => word.length > 0)
  }

  // Helper function to find common word prefix
  const findCommonWordPrefix = (words1, words2) => {
    let i = 0
    while (i < words1.length && i < words2.length && words1[i] === words2[i]) {
      i++
    }
    return i
  }

  // Helper function to find common word suffix
  const findCommonWordSuffix = (words1, words2, prefixLength) => {
    let i = 0
    const maxSuffixLength = Math.min(words1.length - prefixLength, words2.length - prefixLength)
    while (i < maxSuffixLength && 
           words1[words1.length - 1 - i] === words2[words2.length - 1 - i]) {
      i++
    }
    return i
  }

  // Helper function to join words with proper spacing
  const joinWords = (words) => {
    return words.join(' ')
  }

  // Helper function to get cursor position after text change
  const getTextLength = (text) => {
    return text.length
  }

  useEffect(() => {
    if (!strings || strings.length === 0) return

    const currentString = strings[currentStringIndex]
    const nextString = strings[(currentStringIndex + 1) % strings.length]
    
    const timer = setTimeout(() => {
      if (isPaused) {
        // Start transition to next string
        const currentWords = getWords(currentText)
        const nextWords = getWords(nextString)
        const prefixWordLength = findCommonWordPrefix(currentWords, nextWords)
        const suffixWordLength = findCommonWordSuffix(currentWords, nextWords, prefixWordLength)
        
        if (prefixWordLength > 0 || suffixWordLength > 0) {
          // Smart transition - only change the differing words
          const prefixWords = currentWords.slice(0, prefixWordLength)
          const suffixWords = currentWords.slice(currentWords.length - suffixWordLength)
          const oldMiddleWords = currentWords.slice(prefixWordLength, currentWords.length - suffixWordLength)
          const newMiddleWords = nextWords.slice(prefixWordLength, nextWords.length - suffixWordLength)
          
          const prefix = joinWords(prefixWords) + (prefixWords.length > 0 ? ' ' : '')
          const suffix = (suffixWords.length > 0 ? ' ' : '') + joinWords(suffixWords)
          
          setIsTransitioning(true)
          setTransitionData({
            prefix,
            suffix,
            oldMiddleWords,
            newMiddleWords,
            currentMiddleWords: [...oldMiddleWords],
            phase: oldMiddleWords.length > 0 ? 'deleting' : 'typing'
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
        const { prefix, suffix, newMiddleWords, currentMiddleWords, phase } = transitionData
        
        if (phase === 'deleting' && currentMiddleWords.length > 0) {
          // Delete one word from the middle
          const newCurrentMiddleWords = currentMiddleWords.slice(0, -1)
          const newText = prefix + joinWords(newCurrentMiddleWords) + 
                          (newCurrentMiddleWords.length > 0 && suffix.trim() ? ' ' : '') + suffix.trim()
          
          setTransitionData({
            ...transitionData,
            currentMiddleWords: newCurrentMiddleWords,
            phase: newCurrentMiddleWords.length === 0 ? 'typing' : 'deleting'
          })
          setCurrentText(newText)
          setCursorPosition(prefix.length + joinWords(newCurrentMiddleWords).length)
        } else if (phase === 'typing' && currentMiddleWords.length < newMiddleWords.length) {
          // Type one word into the middle
          const newCurrentMiddleWords = newMiddleWords.slice(0, currentMiddleWords.length + 1)
          const newText = prefix + joinWords(newCurrentMiddleWords) + 
                          (newCurrentMiddleWords.length > 0 && suffix.trim() ? ' ' : '') + suffix.trim()
          
          setTransitionData({
            ...transitionData,
            currentMiddleWords: newCurrentMiddleWords,
            phase: newCurrentMiddleWords.length === newMiddleWords.length ? 'complete' : 'typing'
          })
          setCurrentText(newText)
          setCursorPosition(prefix.length + joinWords(newCurrentMiddleWords).length)
        } else {
          // Transition complete
          setIsTransitioning(false)
          setTransitionData(null)
          setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
          setCursorPosition(getTextLength(nextString))
        }
      } else if (isDeleting) {
        // Regular word-based backspacing
        if (currentText.length > 0) {
          const words = getWords(currentText)
          if (words.length > 0) {
            const newWords = words.slice(0, -1)
            const newText = joinWords(newWords)
            setCurrentText(newText)
            setCursorPosition(getTextLength(newText))
          } else {
            setCurrentText('')
            setCursorPosition(0)
          }
        } else {
          // Move to next string
          setIsDeleting(false)
          setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
          setCursorPosition(0)
        }
      } else {
        // Regular word-based typing
        if (currentText.length < currentString.length) {
          const currentWords = getWords(currentText)
          const targetWords = getWords(currentString)
          
          if (currentWords.length < targetWords.length) {
            // Add next word
            const nextWord = targetWords[currentWords.length]
            const newText = currentText + (currentText.length > 0 ? ' ' : '') + nextWord
            setCurrentText(newText)
            setCursorPosition(getTextLength(newText))
          } else {
            // String complete
            setCursorPosition(getTextLength(currentString))
            setIsPaused(true)
          }
        } else {
          // Pause before starting transition
          setIsPaused(true)
        }
      }
    }, isPaused ? delayBetweenStrings : 
        isTransitioning ? (transitionData?.phase === 'deleting' ? deleteSpeed : speed) :
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