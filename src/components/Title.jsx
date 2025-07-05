import { useEffect } from 'react'

const Title = ({ title, children }) => {
  useEffect(() => {
    // Update the document title when the component mounts or title changes
    document.title = title
    
    // Clean up on unmount (optional - restore to default)
    return () => {
      document.title = 'Brandon Choi'
    }
  }, [title])

  // If children are provided, render them. Otherwise, render nothing (just set the title)
  return children || null
}

export default Title