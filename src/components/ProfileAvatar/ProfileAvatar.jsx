import './ProfileAvatar.css'
import { useState, useEffect, useCallback, useRef } from 'react'
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
  // DOM refs for every <video> layer, keyed by index, so we can imperatively
  // control playback (restart/pause) regardless of which item is active.
  const videoRefs = useRef({})
  // Mirrors `reducedMotion` for the restart effect below, so that effect can
  // depend only on `activeIndex`/`media` and not re-fire (and replay) every
  // time the reduced-motion preference changes.
  const reducedMotionRef = useRef(reducedMotion)

  // Keep reducedMotion in sync if the user flips the OS setting mid-session.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event) => setReducedMotion(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    reducedMotionRef.current = reducedMotion
  }, [reducedMotion])

  // Auto-advance through images on a timer. Videos advance via onEnded/onError
  // instead (handled below), so they aren't cut off mid-playback.
  useEffect(() => {
    if (reducedMotion || media.length <= 1) return undefined
    const activeItem = media[activeIndex]
    if (!activeItem || activeItem.type === 'video') return undefined

    const timer = setTimeout(() => {
      setActiveIndex((current) => pickNextIndex(current, media.length))
    }, IMAGE_DISPLAY_MS)

    return () => clearTimeout(timer)
  }, [activeIndex, media, reducedMotion])

  // Whenever a video item becomes the active one, restart it from the top.
  // Without this, a video that already reached "ended" and gets randomly
  // picked again would just sit on its frozen last frame, since toggling the
  // `autoPlay` prop on an already-mounted, already-ended <video> does not
  // restart playback.
  useEffect(() => {
    const activeItem = media[activeIndex]
    if (!activeItem || activeItem.type !== 'video') return undefined
    const videoEl = videoRefs.current[activeIndex]
    if (!videoEl) return undefined

    videoEl.currentTime = 0
    if (!reducedMotionRef.current) {
      const playResult = videoEl.play()
      if (playResult && typeof playResult.catch === 'function') {
        playResult.catch(() => {})
      }
    }

    return () => {
      videoEl.pause()
    }
  }, [activeIndex, media])

  // If the user's reduced-motion preference switches on while a video is
  // actively playing, pause it immediately rather than letting it play out -
  // removing the `autoplay` attribute alone doesn't stop already-playing media.
  useEffect(() => {
    if (!reducedMotion) return undefined
    const activeItem = media[activeIndex]
    if (!activeItem || activeItem.type !== 'video') return undefined
    videoRefs.current[activeIndex]?.pause()
    return undefined
  }, [reducedMotion, activeIndex, media])

  // Shared advance handler for both a video finishing playback and a video
  // failing to load - either way we move on to the next random item so the
  // carousel never gets stuck on a blank/broken/frozen layer.
  const advanceFromVideo = useCallback(() => {
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
                ref={(el) => { videoRefs.current[index] = el }}
                src={item.src}
                poster={item.poster}
                muted
                playsInline
                onEnded={isActive ? advanceFromVideo : undefined}
                onError={isActive ? advanceFromVideo : undefined}
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
