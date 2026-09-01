import './ProfileAvatar.css'
import { useState, useEffect, useCallback } from 'react'
import { PLACEHOLDER_AVATAR_SRC } from './placeholderAvatar'

// How long an image stays on screen before crossfading to the next random item.
const IMAGE_DISPLAY_MS = 6000

// Default media list. For now this is just the locally generated placeholder
// (no real photo exists yet, and nothing here is fetched over the network).
// Adding a real photo/video later is just adding another entry to this array,
// e.g. { type: 'video', src: '/media/wave.mp4', poster: '/media/wave.jpg' }.
const DEFAULT_MEDIA = [
  {
    type: 'image',
    src: PLACEHOLDER_AVATAR_SRC,
    alt: 'Placeholder profile avatar',
    isDefault: true,
  },
]

// Picks a random index different from `current` (when there's more than one
// choice), so the cycler never immediately repeats the item it's already on.
const pickNextIndex = (current, length) => {
  if (length <= 1) return current
  const choices = []
  for (let i = 0; i < length; i += 1) {
    if (i !== current) choices.push(i)
  }
  return choices[Math.floor(Math.random() * choices.length)]
}

const getStartIndex = (media) => {
  const defaultIndex = media.findIndex((item) => item.isDefault)
  return defaultIndex === -1 ? 0 : defaultIndex
}

const prefersReducedMotion = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

const ProfileAvatar = ({ visible = false, media = DEFAULT_MEDIA }) => {
  const [activeIndex, setActiveIndex] = useState(() => getStartIndex(media))
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion)

  // Keep reducedMotion in sync if the user flips the OS setting mid-session.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event) => setReducedMotion(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  // Auto-advance through images on a timer. Videos advance via onEnded instead
  // (handled below), so they aren't cut off mid-playback.
  useEffect(() => {
    if (reducedMotion || media.length <= 1) return undefined
    const activeItem = media[activeIndex]
    if (!activeItem || activeItem.type === 'video') return undefined

    const timer = setTimeout(() => {
      setActiveIndex((current) => pickNextIndex(current, media.length))
    }, IMAGE_DISPLAY_MS)

    return () => clearTimeout(timer)
  }, [activeIndex, media, reducedMotion])

  const handleVideoEnded = useCallback(() => {
    if (reducedMotion) return
    setActiveIndex((current) => pickNextIndex(current, media.length))
  }, [reducedMotion, media.length])

  return (
    <div className={`profile-avatar ${visible ? 'fade-in' : ''}`} role="img" aria-label="Brandon Choi">
      {media.map((item, index) => {
        const isActive = index === activeIndex
        return (
          <div key={`${item.src}-${index}`} className={`profile-avatar-layer ${isActive ? 'active' : ''}`}>
            {item.type === 'video' ? (
              <video
                src={item.src}
                poster={item.poster}
                muted
                playsInline
                autoPlay={isActive && !reducedMotion}
                onEnded={isActive ? handleVideoEnded : undefined}
              />
            ) : (
              <img src={item.src} alt={item.alt || ''} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ProfileAvatar
