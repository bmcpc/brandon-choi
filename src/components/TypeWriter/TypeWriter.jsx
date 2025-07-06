import { useState, useEffect } from 'react'

const TypeWriter = ({ strings, speed = 100, deleteSpeed = 50, delayBetweenStrings = 1000, startDelay = 0 }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionData, setTransitionData] = useState(null)
  const [hasStarted, setHasStarted] = useState(false)

  const getWords = (text) => {
    return text.split(' ').filter(word => word.length > 0)
  }

  const findCommonWordPrefix = (words1, words2) => {
    let i = 0
    while (i < words1.length && i < words2.length && words1[i] === words2[i]) {
      i++
    }
    return i
  }

  const findCommonWordSuffix = (words1, words2, prefixLength) => {
    let i = 0
    const maxSuffixLength = Math.min(words1.length - prefixLength, words2.length - prefixLength)
    while (i < maxSuffixLength && 
           words1[words1.length - 1 - i] === words2[words2.length - 1 - i]) {
      i++
    }
    return i
  }

  const joinWords = (words) => {
    return words.join(' ')
  }

  useEffect(() => {
    if (!strings || strings.length === 0) return

    if (!hasStarted && startDelay > 0) {
      const startTimer = setTimeout(() => {
        setHasStarted(true)
      }, startDelay)
      return () => clearTimeout(startTimer)
    }

    if (!hasStarted && startDelay > 0) return

    const currentString = strings[currentStringIndex]
    const nextString = strings[(currentStringIndex + 1) % strings.length]
    
    const timer = setTimeout(() => {
      if (isPaused) {
        const currentWords = getWords(currentText)
        const nextWords = getWords(nextString)
        const prefixWordLength = findCommonWordPrefix(currentWords, nextWords)
        const suffixWordLength = findCommonWordSuffix(currentWords, nextWords, prefixWordLength)
        
        if (prefixWordLength > 0 || suffixWordLength > 0) {
          const prefixWords = currentWords.slice(0, prefixWordLength)
          const oldMiddleWords = currentWords.slice(prefixWordLength, currentWords.length - suffixWordLength)
          const newMiddleWords = nextWords.slice(prefixWordLength, nextWords.length - suffixWordLength)
          
          const prefixText = joinWords(prefixWords) + (prefixWords.length > 0 ? ' ' : '')
          const oldMiddleText = joinWords(oldMiddleWords)
          const newMiddleText = joinWords(newMiddleWords)
          
          const editStartPos = prefixText.length
          const editEndPos = prefixText.length + oldMiddleText.length
          
          setIsTransitioning(true)
          setTransitionData({
            editStartPos,
            editEndPos,
            newMiddleText,
            phase: 'deleting',
            insertIndex: 0,
            deleteIndex: oldMiddleText.length
          })
        } else {
          setIsDeleting(true)
        }
        setIsPaused(false)
        return
      }

      if (isTransitioning && transitionData) {
        const { editStartPos, editEndPos, newMiddleText, phase, insertIndex, deleteIndex } = transitionData
        
        if (phase === 'deleting') {
          if (deleteIndex > 0) {
            const prefixText = currentText.slice(0, editStartPos)
            const suffixText = currentText.slice(editEndPos)
            const oldMiddleText = currentText.slice(editStartPos, editEndPos)
            const newOldMiddleText = oldMiddleText.slice(0, -1)
            
            setCurrentText(prefixText + newOldMiddleText + suffixText)
            setTransitionData({
              ...transitionData,
              deleteIndex: deleteIndex - 1,
              editEndPos: editEndPos - 1
            })
          } else {
            setTransitionData({
              ...transitionData,
              phase: 'inserting'
            })
          }
        } else if (phase === 'inserting') {
          if (insertIndex < newMiddleText.length) {
            const charToInsert = newMiddleText[insertIndex]
            const insertPos = editStartPos + insertIndex
            const newText = currentText.slice(0, insertPos) + charToInsert + currentText.slice(insertPos)
            setCurrentText(newText)
            setTransitionData({
              ...transitionData,
              insertIndex: insertIndex + 1
            })
          } else {
            setIsTransitioning(false)
            setTransitionData(null)
            setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
          }
        }
      } else if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
        }
      } else {
        if (currentText.length < currentString.length) {
          setCurrentText(currentString.slice(0, currentText.length + 1))
        } else {
          setIsPaused(true)
        }
      }
    }, isPaused ? delayBetweenStrings : 
        isTransitioning ? (transitionData?.phase === 'deleting' ? deleteSpeed : speed) :
        isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timer)
  }, [currentText, currentStringIndex, isDeleting, isPaused, isTransitioning, transitionData, strings, speed, deleteSpeed, delayBetweenStrings, hasStarted, startDelay])

  return (
    <span className="typewriter">
      {currentText}
    </span>
  )
}

export default TypeWriter