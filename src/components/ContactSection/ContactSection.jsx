import { useState, useEffect } from 'react'
import './ContactSection.css'

const ContactSection = ({ visible = false }) => {
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    if (visible) {
      // Wait 500ms after the parent indicates it should be visible
      const timer = setTimeout(() => {
        setContactVisible(true)
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [visible])

  const handleEmailClick = () => {
    window.location.href = 'mailto:your.email@example.com'
  }

  const handleLinkedInClick = () => {
    window.open('https://linkedin.com/in/your-linkedin-username', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="contact-section">
      <div className="contact-container">
        <h3 className={`contact-title ${contactVisible ? 'fade-in' : ''}`}>
          Get In Touch
        </h3>
        
        <div className="contact-icons">
          <button
            className={`contact-icon-item email ${contactVisible ? 'visible' : ''}`}
            onClick={handleEmailClick}
            aria-label="Send email"
            style={{ animationDelay: '0s' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="22,6 12,13 2,6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="contact-text">Email</span>
          </button>

          <button
            className={`contact-icon-item linkedin ${contactVisible ? 'visible' : ''}`}
            onClick={handleLinkedInClick}
            aria-label="Open LinkedIn profile"
            style={{ animationDelay: '0.2s' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="2"
                y="9"
                width="4"
                height="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="4"
                cy="4"
                r="2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="contact-text">LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactSection