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

// Plays a <video>, swallowing the (expected, benign) rejection some browsers
// throw if playback is interrupted.
const safePlay = (videoEl) => {
  const playResult = videoEl.play()
  if (playResult && typeof playResult.catch === 'function') {
    playResult.catch(() => {})
  }
}

// Resets a <video> to the start and plays it.
const playFromStart = (videoEl) => {
  if (!videoEl) return
  videoEl.currentTime = 0
  safePlay(videoEl)
}

const ProfileAvatar = ({ visible = false, media = DEFAULT_MEDIA }) => {
  const [activeIndex, setActiveIndex] = useState(() => getStartIndex(media))
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion)
  // DOM refs for every <video> layer, keyed by index, so we can imperatively
  // control playback (restart/pause) regardless of which item is active.
  const videoRefs = useRef({})
  // Mirrors `reducedMotion` for the restart effect below, so that effect can
  // depend only on `activeIndex`/`media` and not re-fire (and replay) every
  // time the reduced-motion preference changes. Assigned directly in the
  // render body (rather than via its own useEffect) since it's only ever
  // read imperatively later, never used to drive rendering itself.
  const reducedMotionRef = useRef(reducedMotion)
  reducedMotionRef.current = reducedMotion

  // Keep reducedMotion in sync if the user flips the OS setting mid-session.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event) => setReducedMotion(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

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

    if (reducedMotionRef.current) {
      videoEl.currentTime = 0
    } else {
      playFromStart(videoEl)
    }

    return () => {
      videoEl.pause()
    }
  }, [activeIndex, media])

  // Keep the active video in sync with the reduced-motion preference: pause
  // it immediately if the preference switches on mid-playback (removing the
  // `autoplay` attribute alone doesn't stop already-playing media), and
  // resume it if the preference later switches back off - otherwise a video
  // paused this way would stay paused forever, since nothing else calls
  // `.play()` on it (activeIndex hasn't changed, so the restart effect above
  // doesn't re-fire).
  useEffect(() => {
    const activeItem = media[activeIndex]
    if (!activeItem || activeItem.type !== 'video') return undefined
    const videoEl = videoRefs.current[activeIndex]
    if (!videoEl) return undefined

    if (reducedMotion) {
      videoEl.pause()
    } else if (videoEl.paused) {
      safePlay(videoEl)
    }

    return undefined
  }, [reducedMotion, activeIndex, media])

  // Advances to the next random item (or, with only one item, restarts it).
  // Used for the normal end-of-playback cycle only: replaying a single video
  // that just finished on its own is a legitimate "next" step, since it's
  // known to work.
  const advanceToNextMedia = useCallback(() => {
    if (media.length <= 1) {
      // With only one item, `pickNextIndex` would return the same index, so
      // `setActiveIndex` would be a no-op (React bails on an unchanged
      // state value) and the activeIndex-keyed restart effect would never
      // re-fire. Restart the video directly instead.
      playFromStart(videoRefs.current[activeIndex])
      return
    }
    setActiveIndex((current) => pickNextIndex(current, media.length))
  }, [media.length, activeIndex])

  // Normal auto-cycle: only advance when a video finishes if reduced motion
  // isn't requested (matching the image timer's behavior).
  const handleVideoEnded = useCallback(() => {
    if (reducedMotion) return
    advanceToNextMedia()
  }, [reducedMotion, advanceToNextMedia])

  // Error recovery: always advance off a broken video layer, even under
  // reduced motion - otherwise a failed load (404/bad codec) would leave a
  // permanently blank/broken layer with no way to recover. Unlike the
  // normal end-of-playback cycle, this deliberately does NOT reuse
  // `advanceToNextMedia`'s single-item behavior: the item that just errored
  // is a known-broken source, so calling `playFromStart` on it would just
  // retry the identical failing source and loop forever (onError -> advance
  // -> onError -> ...). With nothing else to fall back to in a single-item
  // list, just leave it paused instead of retrying.
  const handleVideoError = useCallback(() => {
    if (media.length <= 1) return
    setActiveIndex((current) => pickNextIndex(current, media.length))
  }, [media.length])

  return (
    <div className={`profile-avatar ${visible ? 'fade-in' : ''}`} role="img" aria-label="Brandon Choi">
      {media.map((item, index) => {
        const isActive = index === activeIndex
        return (
          <div key={`${item.src}-${index}`} className={`profile-avatar-layer ${isActive ? 'active' : ''}`} aria-hidden="true">
            {item.type === 'video' ? (
              <video
                ref={(el) => { videoRefs.current[index] = el }}
                src={item.src}
                poster={item.poster}
                muted
                playsInline
                onEnded={isActive ? handleVideoEnded : undefined}
                onError={isActive ? handleVideoError : undefined}
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
