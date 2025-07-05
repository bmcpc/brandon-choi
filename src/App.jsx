import './App.css'
import Title from './components/Title'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

function App() {
  return (
    <div className="app">
      {/* Title component dynamically sets the document title */}
      <Title title="Brandon Choi" />
      <h1>Brandon Choi</h1>
      
      {/* Tech stack icons */}
      <div className="tech-icons">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
    </div>
  )
}

export default App
