import { useState, useRef, useEffect } from 'react'

export default function Penguin({ onAnimationDone }) {
  const [showStatic, setShowStatic] = useState(false)
  const videoRef = useRef(null)

  // Listen for the parent to signal that the waddle animation is done
  useEffect(() => {
    if (!onAnimationDone) return
    // onAnimationDone is a promise-like or we use a callback pattern
    // We'll handle it via prop change instead — see below
  }, [onAnimationDone])

  const handleSwapToStatic = () => {
    // Pause and hide the video, show the static image
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setShowStatic(true)
  }

  // Expose the swap function via the onAnimationDone callback registration
  useEffect(() => {
    if (onAnimationDone) {
      // Parent will call this when the waddle finishes
      onAnimationDone(handleSwapToStatic)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full h-auto relative">
      {/* Animated WebM video — plays once during waddle, then gets replaced */}
      {!showStatic && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto drop-shadow-xl scale-[1.75] origin-bottom"
          aria-label="Penguin wearing a blue beret walking"
          style={{ pointerEvents: 'none' }}
        >
          <source
            src={`${import.meta.env.BASE_URL}BeretPenguin.done.mov`}
            type="video/quicktime"
          />
          <source
            src={`${import.meta.env.BASE_URL}BeretPenguin.done.webm`}
            type="video/webm"
          />
        </video>
      )}

      {/* Static image — shown after waddle animation ends */}
      {showStatic && (
        <img
          src={`${import.meta.env.BASE_URL}beretPenguin.png`}
          alt="Penguin wearing a blue beret standing"
          className="w-full h-auto drop-shadow-xl scale-[0.8] origin-bottom transition-transform"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </div>
  )
}
