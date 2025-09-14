import { useState, useEffect } from 'react'
import './ExperienceList.css'
import TechStackIcons from '../TechStackIcons/TechStackIcons'

const ExperienceList = ({ items = [] }) => {
  const [selectedId, setSelectedId] = useState(items.length > 0 ? Math.max(...items.map(item => item.id)) : null)
  const [iconsVisible, setIconsVisible] = useState(false)
  const [descriptionVisible, setDescriptionVisible] = useState(false)

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

  useEffect(() => {
    if (iconsVisible) {
      const timer = setTimeout(() => {
        setDescriptionVisible(true)
      }, 1200) // Wait for icons to finish animating (1s + 0.2s per icon)
      
      return () => clearTimeout(timer)
    }
  }, [iconsVisible])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="experience-list">
      <div className="experience-container">
        {/* Top Experience Bar */}
        <div className="experience-icon-bar">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`experience-icon-item ${selectedId === item.id ? 'active' : ''} ${iconsVisible ? 'visible' : ''}`}
              onClick={() => handleItemClick(item.id)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="experience-text">
                {item.title}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Description Panel */}
        <div className="experience-content">
          {selectedItem && descriptionVisible && (
            <div key={selectedItem.id} className="experience-descriptions">
              <h3 className="experience-title">
                {selectedItem.titleHyperlink ? (
                  <a href={selectedItem.titleHyperlink} target="_blank" rel="noopener noreferrer" className="title-hyperlink">
                    {selectedItem.name}
                    <span className="external-link-icon">↗</span>
                  </a>
                ) : (
                  selectedItem.name
                )}
              </h3>
              {selectedItem.techStack && (
                <TechStackIcons 
                  techStack={selectedItem.techStack} 
                  visible={descriptionVisible}
                />
              )}
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