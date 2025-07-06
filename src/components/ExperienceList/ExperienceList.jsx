import { useState, useEffect } from 'react'
import './ExperienceList.css'

const ExperienceList = ({ items = [] }) => {
  const [selectedId, setSelectedId] = useState(items.length > 0 ? Math.max(...items.map(item => item.id)) : null)
  const [iconsVisible, setIconsVisible] = useState(false)

  const selectedItem = items.find(item => item.id === selectedId)

  const handleItemClick = (id) => {
    setSelectedId(id)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIconsVisible(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="experience-list">
      <div className="experience-container">
        {/* Top Icon Bar */}
        <div className="experience-icon-bar">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`experience-icon-item ${selectedId === item.id ? 'active' : ''} ${iconsVisible ? 'visible' : ''}`}
              onClick={() => handleItemClick(item.id)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="experience-icon">
                {typeof item.icon === 'string' && (item.icon.startsWith('/') || item.icon.startsWith('./')) ? (
                  <img 
                    src={item.icon} 
                    alt={`${item.name} logo`}
                    className="experience-logo"
                  />
                ) : typeof item.icon === 'string' ? (
                  item.icon
                ) : (
                  <img 
                    src={item.icon} 
                    alt={`${item.name} logo`}
                    className="experience-logo"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Description Panel */}
        <div className="experience-content">
          {selectedItem && (
            <div key={selectedItem.id} className="experience-descriptions">
              <h3 className="experience-title">{selectedItem.name}</h3>
              <ul className="experience-list-items">
                {selectedItem.descriptions.map((description, index) => (
                  <li key={index} className="experience-list-item">
                    {description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExperienceList