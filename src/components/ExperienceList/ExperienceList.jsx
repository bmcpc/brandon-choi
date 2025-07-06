import { useState } from 'react'
import './ExperienceList.css'

const ExperienceList = ({ items = [] }) => {
  const [selectedId, setSelectedId] = useState(items.length > 0 ? items[0].id : null)

  const selectedItem = items.find(item => item.id === selectedId)

  const handleItemClick = (id) => {
    setSelectedId(id)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="experience-list">
      <div className="experience-container">
        <div className="experience-sidebar">
          {items.map((item) => (
            <div
              key={item.id}
              className={`experience-item ${selectedId === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
            >
              <div className="experience-icon">
                {item.icon}
              </div>
              <div className="experience-name">
                {item.name}
              </div>
            </div>
          ))}
        </div>
        
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