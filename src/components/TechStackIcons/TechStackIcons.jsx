import './TechStackIcons.css'

const TechStackIcons = ({ techStack = [], visible = false }) => {
  // Mapping of tech names to icon data
  const techIconMap = {
    python: {
      name: 'Python',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: '#3776ab'
    },
    vue: {
      name: 'Vue.js',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      color: '#4fc08d'
    },
    cursor: {
      name: 'Cursor',
      // Using a generic code editor icon since Cursor might not be available
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      color: '#007acc'
    },
    csharp: {
      name: 'C#',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      color: '#239120'
    },
    dotnet: {
      name: '.NET',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
      color: '#512bd4'
    },
    azure: {
      name: 'Azure',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      color: '#0078d4'
    },
    kubernetes: {
      name: 'Kubernetes',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      color: '#326ce5'
    },
    redis: {
      name: 'Redis',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      color: '#dc382d'
    },
    sqlserver: {
      name: 'SQL Server',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
      color: '#cc2927'
    },
    react: {
      name: 'React',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: '#61dafb'
    },
    aws: {
      name: 'AWS',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
      color: '#ff9900'
    },
    mongodb: {
      name: 'MongoDB',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      color: '#47a248'
    },
    nodejs: {
      name: 'Node.js',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: '#339933'
    },
    typescript: {
      name: 'TypeScript',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      color: '#3178c6'
    },
    java: {
      name: 'Java',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      color: '#ed8b00'
    },
    spring: {
      name: 'Spring',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      color: '#6db33f'
    },
    kafka: {
      name: 'Apache Kafka',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg',
      color: '#231f20'
    },
    c: {
      name: 'C',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      color: '#a8b9cc'
    },
    linux: {
      name: 'Linux',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      color: '#fcc624'
    },
    entityframework: {
      name: 'Entity Framework',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
      color: '#512bd4'
    }
  }

  if (!techStack.length) {
    return null
  }

  return (
    <div className={`tech-stack-icons ${visible ? 'visible' : ''}`}>
      {techStack.map((tech, index) => {
        const techInfo = techIconMap[tech]
        if (!techInfo) return null
        
        return (
          <div
            key={tech}
            className="tech-icon"
            style={{ animationDelay: `${index * 0.1}s` }}
            title={techInfo.name}
          >
            <img
              src={techInfo.url}
              alt={techInfo.name}
              className="tech-icon-image"
              onError={(e) => {
                // Fallback to a generic icon if the specific one fails to load
                e.target.style.display = 'none'
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TechStackIcons