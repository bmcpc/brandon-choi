import './App.css'
import Title from './components/Title'
import TypeWriter from './components/TypeWriter'
import ExperienceList from './components/ExperienceList'
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

  // Sample data for ExperienceList
  const experienceData = [
    {
      id: 1,
      name: "Full Stack Development",
      icon: "🚀",
      descriptions: [
        "Built scalable web applications using React, Node.js, and MongoDB",
        "Implemented RESTful APIs and GraphQL endpoints",
        "Deployed applications using Docker and AWS services",
        "Collaborated with cross-functional teams in Agile environment"
      ]
    },
    {
      id: 2,
      name: "Backend Engineering",
      icon: "⚙️",
      descriptions: [
        "Designed and maintained microservices architecture",
        "Optimized database queries and improved performance by 40%",
        "Implemented automated testing and CI/CD pipelines",
        "Built real-time features using WebSocket and Server-Sent Events"
      ]
    },
    {
      id: 3,
      name: "Cloud Architecture",
      icon: "☁️",
      descriptions: [
        "Architected and deployed cloud-native solutions on AWS",
        "Implemented Infrastructure as Code using Terraform",
        "Set up monitoring and alerting systems with CloudWatch",
        "Managed containerized applications with ECS and Lambda functions"
      ]
    },
    {
      id: 4,
      name: "Data Engineering",
      icon: "📊",
      descriptions: [
        "Built ETL pipelines processing millions of records daily",
        "Implemented data warehousing solutions using Snowflake",
        "Created real-time analytics dashboards with D3.js",
        "Optimized data processing workflows reducing costs by 30%"
      ]
    },
    {
      id: 5,
      name: "Mobile Development",
      icon: "📱",
      descriptions: [
        "Developed cross-platform mobile apps using React Native",
        "Implemented offline-first architecture with Redux Persist",
        "Integrated push notifications and deep linking",
        "Published apps to both iOS App Store and Google Play Store"
      ]
    }
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

      <ExperienceList items={experienceData} />
    </div>
  )
}

export default App
