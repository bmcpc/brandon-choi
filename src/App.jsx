import './App.css'
import Title from './components/Title'
import TypeWriter from './components/TypeWriter'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

function App() {
  const typewriterStrings = [
    "Software Engineer",
    "Backend Engineer",
    "React Developer",
    "Full Stack Engineer"
  ]

  return (
    <div className="app">
      {/* Title component dynamically sets the document title */}
      <Title title="Brandon Choi" />
      
      {/* Main static title */}
      <h1>Brandon Choi</h1>
      
      {/* TypeWriter component with cycling roles */}
      <TypeWriter 
        strings={typewriterStrings} 
        speed={100} 
        deleteSpeed={50} 
        delayBetweenStrings={1500} 
      />
      
      {/* Tech stack icons */}
      <div className="tech-icons">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
    </div>
  )
}

export default App
