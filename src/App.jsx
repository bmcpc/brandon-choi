import './App.css'
import Title from './components/Title'

function App() {
  return (
    <div className="app">
      {/* Title component dynamically sets the document title */}
      <Title title="Brandon Choi" />
      <h1>Brandon Choi</h1>
    </div>
  )
}

export default App
