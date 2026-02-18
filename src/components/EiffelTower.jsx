import { useEffect, useRef } from 'react'

export default function EiffelTower() {
  const pathRefs = useRef([])

  useEffect(() => {
    pathRefs.current.forEach((path, i) => {
      if (!path) return
      const length = path.getTotalLength()
      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length
      path.style.animation = `draw 2s ease-in-out ${i * 0.15}s forwards`
    })
  }, [])

  const addRef = (el) => {
    if (el && !pathRefs.current.includes(el)) {
      pathRefs.current.push(el)
    }
  }

  return (
    <svg
      viewBox="0 0 200 400"
      className="w-32 md:w-44 lg:w-52 h-auto"
      fill="none"
      stroke="#888888"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Eiffel Tower sketch"
    >
      {/* Spire */}
      <path ref={addRef} d="M100 10 L100 60" />
      <path ref={addRef} d="M97 20 L103 20" />
      <path ref={addRef} d="M95 30 L105 30" />

      {/* Top section */}
      <path ref={addRef} d="M92 60 L108 60" />
      <path ref={addRef} d="M90 60 L80 120 L120 120 L110 60" />
      <path ref={addRef} d="M85 75 L115 75" />
      <path ref={addRef} d="M83 90 L117 90" />
      <path ref={addRef} d="M81 105 L119 105" />

      {/* First platform */}
      <path ref={addRef} d="M72 120 L128 120" strokeWidth="2" />
      <path ref={addRef} d="M74 120 L74 128 L126 128 L126 120" />

      {/* Middle section */}
      <path ref={addRef} d="M74 128 L55 220 L145 220 L126 128" />
      <path ref={addRef} d="M70 150 L130 150" />
      <path ref={addRef} d="M65 175 L135 175" />
      <path ref={addRef} d="M60 200 L140 200" />

      {/* Arch in middle */}
      <path ref={addRef} d="M80 128 C 85 160, 100 170, 100 170 C 100 170, 115 160, 120 128" />

      {/* Second platform */}
      <path ref={addRef} d="M48 220 L152 220" strokeWidth="2" />
      <path ref={addRef} d="M50 220 L50 230 L150 230 L150 220" />

      {/* Lower section */}
      <path ref={addRef} d="M50 230 L20 370 L180 370 L150 230" />
      <path ref={addRef} d="M46 250 L154 250" />
      <path ref={addRef} d="M40 280 L160 280" />
      <path ref={addRef} d="M35 310 L165 310" />
      <path ref={addRef} d="M28 340 L172 340" />

      {/* Grand arch */}
      <path ref={addRef} d="M50 230 C 60 300, 100 340, 100 370 C 100 340, 140 300, 150 230" strokeWidth="1.8" />

      {/* Cross braces */}
      <path ref={addRef} d="M65 250 L82 280" />
      <path ref={addRef} d="M135 250 L118 280" />
      <path ref={addRef} d="M55 280 L72 310" />
      <path ref={addRef} d="M145 280 L128 310" />

      {/* Base feet */}
      <path ref={addRef} d="M10 370 L50 370" strokeWidth="2.5" />
      <path ref={addRef} d="M150 370 L190 370" strokeWidth="2.5" />

      {/* Ground line */}
      <path ref={addRef} d="M5 372 L195 372" strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}
