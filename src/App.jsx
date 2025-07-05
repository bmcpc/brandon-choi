import './App.css'
import Title from './components/Title'
import TypeWriter from './components/TypeWriter'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { useState, useEffect } from 'react'

function App() {
  const [titleVisible, setTitleVisible] = useState(false)
  const typewriterStrings = [
    "Software Engineer",
    "Backend Engineer",
    "Full Stack Engineer"
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleVisible(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      <Title title="Brandon Choi" />
      
      <h1 className={`main-title ${titleVisible ? 'fade-in' : ''}`}>Brandon Choi</h1>
      
      <TypeWriter 
        strings={typewriterStrings} 
        speed={100} 
        deleteSpeed={50} 
        delayBetweenStrings={1500}
        startDelay={1800}
      />
      
      <div className="tech-icons">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
    </div>
  )
}

export default App
