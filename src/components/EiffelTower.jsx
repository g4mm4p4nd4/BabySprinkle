import { useEffect, useRef, useState } from 'react'

/*
 * Eiffel Tower – hand-crafted SVG with mathematically-derived parabolic legs.
 *
 * Real tower proportions (metres):
 *   Total height  324       Base width  ~125
 *   1st floor     57.6m     2nd floor   115.7m    Summit  276.1m
 *
 * Mapped to viewBox 0 0 240 500:
 *   ground  y=488   base-width ~220
 *   2nd flr y=322   width ~130
 *   1st flr y=200   width ~90
 *   summit  y=68    width ~16
 *   tip     y=10
 *
 * Leg curves follow y = a·x² (parabolic), approximated with cubic beziers.
 * Centre axis: x = 120
 */

export default function EiffelTower() {
  const pathRefs = useRef([])
  const [drawDone, setDrawDone] = useState(false)

  const addRef = (el) => {
    if (el && !pathRefs.current.includes(el)) {
      pathRefs.current.push(el)
    }
  }

  useEffect(() => {
    let maxEnd = 0
    pathRefs.current.forEach((path, i) => {
      if (!path) return
      const length = path.getTotalLength()
      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length
      const delay = i * 0.06
      const duration = 1.4
      path.style.animation = `draw ${duration}s ease-in-out ${delay}s forwards`
      const end = delay + duration
      if (end > maxEnd) maxEnd = end
    })
    const timer = setTimeout(() => setDrawDone(true), maxEnd * 1000)
    return () => clearTimeout(timer)
  }, [])

  // Sparkle positions tuned to new geometry: [cx, cy, delay, size]
  const sparkles = [
    [120, 12, 0,    5],
    [120, 12, 0.5,  3.5],
    [76,  200, 0.1, 3],
    [164, 200, 0.3, 3],
    [56,  322, 0.15, 3.5],
    [184, 322, 0.35, 3.5],
    [95,  130, 0.2, 2.5],
    [145, 130, 0.4, 2.5],
    [20,  460, 0.05, 2.5],
    [220, 460, 0.45, 2.5],
  ]

  return (
    <svg
      viewBox="0 0 240 500"
      className="w-32 md:w-44 lg:w-52 h-auto"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Eiffel Tower"
      style={{ color: '#4A74A3' }}
    >
      {/* ═══════════════════════════════════════
          SPIRE & ANTENNA  (y 10 → 68)
          ═══════════════════════════════════════ */}
      <path ref={addRef} strokeWidth="1.2" d="M120 10 L120 50" />
      <path ref={addRef} strokeWidth="0.8" d="M118 18 L122 18" />
      <path ref={addRef} strokeWidth="0.8" d="M117 24 L123 24" />
      <path ref={addRef} strokeWidth="0.9" d="M116 30 L124 30" />
      <path ref={addRef} strokeWidth="1"   d="M115 37 L125 37" />
      {/* Small dome / observation cap */}
      <path ref={addRef} strokeWidth="1"
        d="M114 44 Q 117 40, 120 39 Q 123 40, 126 44" />
      <path ref={addRef} strokeWidth="1.2" d="M113 44 L127 44" />

      {/* ═══════════════════════════════════════
          UPPER SECTION  (summit → 1st platform, y 44 → 200)
          Gentle parabolic curves narrowing upward
          ═══════════════════════════════════════ */}
      {/* Left edge */}
      <path ref={addRef} strokeWidth="1.3"
        d="M113 44 C 110 80, 100 140, 76 200" />
      {/* Right edge */}
      <path ref={addRef} strokeWidth="1.3"
        d="M127 44 C 130 80, 140 140, 164 200" />
      {/* Horizontal lattice bars */}
      <path ref={addRef} strokeWidth="0.6" d="M112 58  L128 58"  />
      <path ref={addRef} strokeWidth="0.6" d="M110 72  L130 72"  />
      <path ref={addRef} strokeWidth="0.6" d="M108 88  L132 88"  />
      <path ref={addRef} strokeWidth="0.7" d="M105 105 L135 105" />
      <path ref={addRef} strokeWidth="0.7" d="M101 124 L139 124" />
      <path ref={addRef} strokeWidth="0.7" d="M96  144 L144 144" />
      <path ref={addRef} strokeWidth="0.8" d="M91  164 L149 164" />
      <path ref={addRef} strokeWidth="0.8" d="M84  184 L156 184" />
      {/* Cross-bracing */}
      <path ref={addRef} strokeWidth="0.45" d="M112 58 L130 88" />
      <path ref={addRef} strokeWidth="0.45" d="M128 58 L110 88" />
      <path ref={addRef} strokeWidth="0.45" d="M108 88 L135 124" />
      <path ref={addRef} strokeWidth="0.45" d="M132 88 L105 124" />
      <path ref={addRef} strokeWidth="0.5"  d="M101 124 L144 164" />
      <path ref={addRef} strokeWidth="0.5"  d="M139 124 L96 164" />
      <path ref={addRef} strokeWidth="0.5"  d="M91 164 L156 200" />
      <path ref={addRef} strokeWidth="0.5"  d="M149 164 L84 200" />

      {/* ═══════════════════════════════════════
          FIRST PLATFORM  (y 196 → 210)
          ═══════════════════════════════════════ */}
      <path ref={addRef} strokeWidth="2.2" d="M70 200 L170 200" />
      <path ref={addRef} strokeWidth="1.2"
        d="M72 200 L72 210 L168 210 L168 200" />
      {/* Chevron supports under platform */}
      <path ref={addRef} strokeWidth="0.6"
        d="M76 203 L84 210 M92 203 L84 210 M92 203 L100 210 M108 203 L100 210 M108 203 L116 210 M124 203 L116 210 M124 203 L132 210 M140 203 L132 210 M140 203 L148 210 M156 203 L148 210 M156 203 L164 210" />

      {/* ═══════════════════════════════════════
          FIRST-FLOOR ARCH
          ═══════════════════════════════════════ */}
      <path ref={addRef} strokeWidth="1.1"
        d="M76 200 C 80 230, 108 248, 120 252 C 132 248, 160 230, 164 200" />

      {/* ═══════════════════════════════════════
          MIDDLE SECTION  (1st platform → 2nd platform, y 210 → 322)
          Parabolic legs curving outward more strongly
          ═══════════════════════════════════════ */}
      {/* Left leg */}
      <path ref={addRef} strokeWidth="1.6"
        d="M72 210 C 68 240, 62 280, 56 322" />
      {/* Right leg */}
      <path ref={addRef} strokeWidth="1.6"
        d="M168 210 C 172 240, 178 280, 184 322" />
      {/* Horizontal lattice */}
      <path ref={addRef} strokeWidth="0.7"  d="M70 225 L170 225" />
      <path ref={addRef} strokeWidth="0.7"  d="M68 242 L172 242" />
      <path ref={addRef} strokeWidth="0.8"  d="M65 260 L175 260" />
      <path ref={addRef} strokeWidth="0.8"  d="M62 278 L178 278" />
      <path ref={addRef} strokeWidth="0.9"  d="M59 296 L181 296" />
      <path ref={addRef} strokeWidth="0.9"  d="M57 312 L183 312" />
      {/* Cross-bracing */}
      <path ref={addRef} strokeWidth="0.5" d="M70 225 L172 260" />
      <path ref={addRef} strokeWidth="0.5" d="M170 225 L68 260" />
      <path ref={addRef} strokeWidth="0.5" d="M65 260 L178 296" />
      <path ref={addRef} strokeWidth="0.5" d="M175 260 L62 296" />

      {/* ═══════════════════════════════════════
          SECOND PLATFORM  (y 318 → 332)
          ═══════════════════════════════════════ */}
      <path ref={addRef} strokeWidth="2.5" d="M48 322 L192 322" />
      <path ref={addRef} strokeWidth="1.3"
        d="M50 322 L50 332 L190 332 L190 322" />
      {/* Chevron supports */}
      <path ref={addRef} strokeWidth="0.6"
        d="M54 325 L66 332 M78 325 L66 332 M78 325 L90 332 M102 325 L90 332 M102 325 L114 332 M126 325 L114 332 M126 325 L138 332 M150 325 L138 332 M150 325 L162 332 M174 325 L162 332 M174 325 L186 332" />

      {/* ═══════════════════════════════════════
          GRAND ARCH  (between 2nd platform and base)
          ═══════════════════════════════════════ */}
      <path ref={addRef} strokeWidth="1.4"
        d="M50 332 C 58 380, 96 430, 120 448 C 144 430, 182 380, 190 332" />

      {/* ═══════════════════════════════════════
          LOWER SECTION  (2nd platform → base, y 332 → 488)
          Strongest parabolic flare
          ═══════════════════════════════════════ */}
      {/* Left leg — aggressive outward curve */}
      <path ref={addRef} strokeWidth="2"
        d="M50 332 C 44 365, 30 410, 15 460 C 10 472, 6 480, 4 488" />
      {/* Right leg */}
      <path ref={addRef} strokeWidth="2"
        d="M190 332 C 196 365, 210 410, 225 460 C 230 472, 234 480, 236 488" />
      {/* Horizontal lattice */}
      <path ref={addRef} strokeWidth="0.8"  d="M47 348 L193 348" />
      <path ref={addRef} strokeWidth="0.9"  d="M42 368 L198 368" />
      <path ref={addRef} strokeWidth="0.9"  d="M36 388 L204 388" />
      <path ref={addRef} strokeWidth="1"    d="M28 410 L212 410" />
      <path ref={addRef} strokeWidth="1"    d="M20 432 L220 432" />
      <path ref={addRef} strokeWidth="1.1"  d="M12 456 L228 456" />
      <path ref={addRef} strokeWidth="1.1"  d="M5  476 L235 476" />
      {/* Cross-bracing (3 X sections for visual richness) */}
      <path ref={addRef} strokeWidth="0.55" d="M47 348 L198 388" />
      <path ref={addRef} strokeWidth="0.55" d="M193 348 L42 388" />
      <path ref={addRef} strokeWidth="0.6"  d="M36 388 L212 432" />
      <path ref={addRef} strokeWidth="0.6"  d="M204 388 L28 432" />
      <path ref={addRef} strokeWidth="0.6"  d="M20 432 L228 476" />
      <path ref={addRef} strokeWidth="0.6"  d="M220 432 L12 476" />

      {/* ═══════════════════════════════════════
          BASE FEET  (y 484 → 492)
          Four flared foot-pads
          ═══════════════════════════════════════ */}
      {/* Left outer foot */}
      <path ref={addRef} strokeWidth="2.5"
        d="M4 488 Q 0 492, 2 494 L 18 494" />
      {/* Left inner foot */}
      <path ref={addRef} strokeWidth="2"
        d="M18 494 L 40 488 Q 55 484, 70 488 L 70 494" />
      {/* Right inner foot */}
      <path ref={addRef} strokeWidth="2"
        d="M170 494 L 200 488 Q 185 484, 170 488 L 170 494" />
      {/* Right outer foot */}
      <path ref={addRef} strokeWidth="2.5"
        d="M236 488 Q 240 492, 238 494 L 222 494" />
      {/* Ground line */}
      <path ref={addRef} strokeWidth="0.5" opacity="0.3"
        d="M0 496 L240 496" />

      {/* ═══════════════════════════════════════
          BEACON SPARKLES  (after draw completes)
          ═══════════════════════════════════════ */}
      {drawDone && sparkles.map(([cx, cy, delay, size], i) => (
        <g key={i} style={{ animation: `sparkle 1.8s ease-in-out ${delay}s infinite` }}>
          <path
            fill="#F2C94C"
            stroke="none"
            d={`M${cx} ${cy - size} L${cx + size * 0.35} ${cy - size * 0.35} L${cx + size} ${cy} L${cx + size * 0.35} ${cy + size * 0.35} L${cx} ${cy + size} L${cx - size * 0.35} ${cy + size * 0.35} L${cx - size} ${cy} L${cx - size * 0.35} ${cy - size * 0.35} Z`}
          />
        </g>
      ))}

      {drawDone && (
        <circle
          cx="120" cy="12" r="8"
          fill="none"
          stroke="#F2C94C"
          strokeWidth="1"
          style={{ animation: 'beaconGlow 1.8s ease-in-out infinite' }}
        />
      )}
    </svg>
  )
}
