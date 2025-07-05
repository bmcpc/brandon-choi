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

  // Experience data from resume
  const experienceData = [
    {
      id: 1,
      name: "Geico",
      icon: "🏢",
      descriptions: [
        "Led technical debt reduction to enhance scalability and reliability by developing a re-usable Message Broker package (NServiceBus replacement) and re-architecting usage of Azure Service Bus and Kubernetes for efficient resource usage",
        "Contributed rapidly to the development of new features for the Rescoring platform using C#/.NET 8, Redis, SQL Server, Kubernetes, while improving scalability and performance for high-volume use"
      ]
    },
    {
      id: 2,
      name: "Glidewell Dental Labs",
      icon: "🦷",
      descriptions: [
        "Decomposed monolithic Lab Management System facilitating order processing; designed and built event-driven microservice RESTful APIs using .NET 6, C#, React, while hosted in AWS (ECS, MQ/RabbitMQ, DocumentDB/MongoDB, Opensearch/Elasticsearch)",
        "Migrated order auto-printing service from legacy monolith to event-driven serverless design using AWS SNS and Lambda in NodeJS and TypeScript"
      ]
    },
    {
      id: 3,
      name: "Happy Money",
      icon: "💰",
      descriptions: [
        "Implemented API features for Java Spring Boot event-driven (Kafka) microservices responsible for communicating with 3rd party APIs to catch fraudulent loan applications"
      ]
    },
    {
      id: 4,
      name: "Amazon (AWS, Luna)",
      icon: "�",
      descriptions: [
        "Implemented performance monitoring using Linux pseudofiles for in-house streaming server to provide additional insight on games running on Linux servers utilizing Proton in C; visualized via Kibana dashboards",
        "Designed automation smoke testing of games utilizing AWS tools (Lambda, SNS, SQS, S3) with Python to communicate with an existing headless testing tool",
        "Maintained and managed console platform (website) for other System Manager tool assets via internal server platform in React w/ Typescript and Java, deployed in AWS",
        "Led region build effort for MXP and CPT of Systems Manager by preparing resources and assets via internal tooling, testing, and identifying pain points for automation"
      ]
    },
    {
      id: 5,
      name: "iHerb",
      icon: "🌿",
      descriptions: [
        "Built out various distributed microservices (Web APIs, windows services) using C#, .NET Core, Entity Framework, SQL Server, and Domain Driven Design to handle critical order processing business logic and inventory",
        "Improved Inventory HTTP API to single millisecond response times (50% faster) utilizing CQRS pattern and caching"
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
        <img 
          src={viteLogo} 
          className="logo clickable" 
          alt="Vite" 
          onClick={() => window.open('https://vitejs.dev/', '_blank')}
        />
        <img 
          src={reactLogo} 
          className="logo react clickable" 
          alt="React" 
          onClick={() => window.open('https://reactjs.org/', '_blank')}
        />
      </div>

      <ExperienceList items={experienceData} />
    </div>
  )
}

export default App
