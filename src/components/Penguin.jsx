import { useState, useRef, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export default function Penguin({ onAnimationDone }) {
  const [showStatic, setShowStatic] = useState(false)
  const dotLottieRef = useRef(null)

  // Listen for the parent to signal that the waddle animation is done
  useEffect(() => {
    if (!onAnimationDone) return
    // onAnimationDone is a promise-like or we use a callback pattern
    // We'll handle it via prop change instead — see below
  }, [onAnimationDone])

  const handleSwapToStatic = () => {
    // Pause the lottie animation, show the static image
    if (dotLottieRef.current) {
      dotLottieRef.current.pause()
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
      {/* Animated Lottie — plays while waddling, then gets replaced */}
      {!showStatic && (
        <DotLottieReact
          src={`${import.meta.env.BASE_URL}PenguinLottie.lottie`}
          animationId="Main Scene"
          loop
          autoplay
          dotLottieRefCallback={(ref) => {
            dotLottieRef.current = ref;
          }}
          className="w-full h-auto drop-shadow-xl"
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            transform: 'scale(1.75) rotate(180deg)',
            transformOrigin: 'center center'
          }}
        />
      )}

      {/* Static image — shown after waddle animation ends */}
      {showStatic && (
        <img
          src={`${import.meta.env.BASE_URL}beretPenguin.png`}
          alt="Penguin wearing a blue beret standing"
          className="w-full h-auto drop-shadow-xl scale-[0.6] origin-bottom transition-transform"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </div>
  )
}
