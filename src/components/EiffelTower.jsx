import { useRef, useEffect } from 'react'

export default function EiffelTower() {
  const containerRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let rafId = null

    const loadAndAnimate = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}eiffeltower.svg`)
        const svgText = await res.text()
        if (cancelled) return

        // Inject SVG directly into DOM
        containerRef.current.innerHTML = svgText
        const svg = containerRef.current.querySelector('svg')
        if (!svg) return

        // Use the full original viewBox so the entire SVG is visible
        const VX = 0, VY = 0, VW = 1000, VH = 1000

        svg.setAttribute('viewBox', `${VX} ${VY} ${VW} ${VH}`)
        svg.removeAttribute('style')
        svg.removeAttribute('x')
        svg.removeAttribute('y')
        svg.classList.add('eiffel-svg')
        svg.style.overflow = 'visible'

        // Remove white background layer if present
        const bgLayer = svg.querySelector('#Layer_1')
        if (bgLayer) bgLayer.remove()

        const svgNS = 'http://www.w3.org/2000/svg'

        // Ensure defs exists
        let defs = svg.querySelector('defs')
        if (!defs) {
          defs = document.createElementNS(svgNS, 'defs')
          svg.insertBefore(defs, svg.firstChild)
        }

        // --- Build animated mask ---
        const mask = document.createElementNS(svgNS, 'mask')
        mask.setAttribute('id', 'sketch-reveal')
        mask.setAttribute('maskUnits', 'userSpaceOnUse')

        const STRIPS = 55
        const STRIP_H = VH / STRIPS
        const TOTAL_DUR = 3.8
        const STRIP_DUR = 0.35

        // Deterministic pseudo-random for consistent jitter
        const pr = (seed) => ((seed * 2654435761 >>> 0) % 1000) / 1000

        const strips = []
        for (let i = 0; i < STRIPS; i++) {
          const rect = document.createElementNS(svgNS, 'rect')
          const y = VY + i * STRIP_H

          rect.setAttribute('y', String(y - 1))
          rect.setAttribute('height', String(STRIP_H + 2))
          rect.setAttribute('fill', 'white')

          const fromRight = pr(i + 3) > 0.75

          if (fromRight) {
            rect.setAttribute('x', String(VX + VW))
            rect.setAttribute('width', '0')
          } else {
            rect.setAttribute('x', String(VX))
            rect.setAttribute('width', '0')
          }

          mask.appendChild(rect)

          const jitter = pr(i) * 0.12
          const delay = (i / STRIPS) * TOTAL_DUR + jitter
          const duration = STRIP_DUR + pr(i + 7) * 0.15

          strips.push({ rect, delay, duration, fromRight, y: y + STRIP_H / 2 })
        }

        defs.appendChild(mask)

        // Apply mask to the illustration layer
        const contentGroup = svg.querySelector('#Layer_3')
        if (contentGroup) {
          contentGroup.setAttribute('mask', 'url(#sketch-reveal)')
        }

        // --- Create animated pencil ---
        const pencilGroup = document.createElementNS(svgNS, 'g')
        pencilGroup.setAttribute('id', 'sketch-pencil')
        // Pencil tip points down-right, body angled ~45°
        // Drawn in a small local space, then positioned via transform
        pencilGroup.innerHTML = `
          <g transform="rotate(-35) scale(0.9)">
            <!-- Pencil body -->
            <rect x="0" y="-4" width="55" height="8" rx="1.5" fill="#F4C542" stroke="#C4960C" stroke-width="0.8"/>
            <!-- Wood/ferrule band -->
            <rect x="48" y="-4.5" width="8" height="9" rx="0.5" fill="#D4A84B" stroke="#A67C1A" stroke-width="0.5"/>
            <!-- Eraser -->
            <rect x="-8" y="-3.5" width="9" height="7" rx="2" fill="#E88B8B" stroke="#C06060" stroke-width="0.5"/>
            <!-- Metal band -->
            <rect x="-1" y="-4" width="3" height="8" rx="0.3" fill="#B8B8B8" stroke="#888" stroke-width="0.4"/>
            <!-- Pencil tip (triangle) -->
            <polygon points="56,-4 56,4 68,0" fill="#F5DEB3" stroke="#8B7355" stroke-width="0.5"/>
            <!-- Graphite tip -->
            <polygon points="63,-2 63,2 70,0" fill="#444"/>
            <!-- Shine highlight on body -->
            <rect x="8" y="-3" width="35" height="2" rx="1" fill="rgba(255,255,255,0.35)"/>
          </g>
        `
        pencilGroup.style.opacity = '0'
        svg.appendChild(pencilGroup)

        // --- rAF-driven animation ---
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
        const startTime = performance.now()

        const animateFrame = (now) => {
          if (cancelled) return
          const elapsed = (now - startTime) / 1000
          let allDone = true

          // Track the leading edge of the drawing for pencil position
          let pencilX = VX + VW / 2
          let pencilY = VY
          let anyActive = false

          for (const strip of strips) {
            const t = (elapsed - strip.delay) / strip.duration

            if (t < 0) {
              allDone = false
            } else if (t >= 1) {
              const w = strip.rect.getAttribute('width')
              if (w !== String(VW)) {
                strip.rect.setAttribute('width', String(VW))
                if (strip.fromRight) {
                  strip.rect.setAttribute('x', String(VX))
                }
              }
            } else {
              allDone = false
              anyActive = true
              const progress = easeOutCubic(t)
              const currentW = progress * VW

              strip.rect.setAttribute('width', String(currentW))
              if (strip.fromRight) {
                strip.rect.setAttribute('x', String(VX + VW - currentW))
                // Pencil follows the leading edge (left side for right-origin strips)
                pencilX = VX + VW - currentW
              } else {
                // Pencil follows the right edge of the growing strip
                pencilX = VX + currentW
              }
              pencilY = strip.y
            }
          }

          // Position the pencil at the drawing edge
          if (anyActive) {
            pencilGroup.style.opacity = '1'
            pencilGroup.setAttribute('transform', `translate(${pencilX - 70}, ${pencilY - 2})`)
          }

          if (allDone) {
            // Fade out pencil when done
            pencilGroup.style.transition = 'opacity 0.5s ease-out'
            pencilGroup.style.opacity = '0'

            // Reduce tower content opacity so it fades into the background
            // Pencil is already hidden; only the tower layer gets dimmed
            if (contentGroup) {
              contentGroup.style.transition = 'opacity 1.2s ease-out'
              contentGroup.style.opacity = '0.35'
            }
          }

          if (!allDone && !cancelled) {
            rafId = requestAnimationFrame(animateFrame)
          }
        }

        rafId = requestAnimationFrame(animateFrame)
      } catch (err) {
        console.error('Failed to load Eiffel Tower SVG:', err)
      }
    }

    loadAndAnimate()
    return () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ overflow: 'visible' }}
      aria-label="Eiffel Tower illustration being sketched"
    />
  )
}
