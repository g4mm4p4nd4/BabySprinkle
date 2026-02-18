import { useEffect, useRef, useState } from 'react'

function EclairIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* Eclair body */}
      <ellipse cx="24" cy="28" rx="18" ry="10" fill="#D4A574" opacity="0.9" />
      {/* Chocolate topping */}
      <path d="M8 25 C8 20, 14 17, 24 17 C34 17, 40 20, 40 25 C40 28, 34 22, 24 22 C14 22, 8 28, 8 25 Z" fill="#6B3A2A" opacity="0.85" />
      {/* Cream filling */}
      <ellipse cx="24" cy="30" rx="14" ry="3" fill="#FFF8DC" opacity="0.7" />
      {/* Shine */}
      <ellipse cx="20" cy="20" rx="4" ry="1.5" fill="white" opacity="0.3" />
    </svg>
  )
}

function DiaperIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* Diaper shape */}
      <path d="M10 14 L38 14 L40 22 C40 32, 34 38, 24 38 C14 38, 8 32, 8 22 Z" fill="#E8E4DE" stroke="#C4BFB6" strokeWidth="1" />
      {/* Tab left */}
      <rect x="8" y="14" width="8" height="6" rx="2" fill="#87CEEB" opacity="0.6" />
      {/* Tab right */}
      <rect x="32" y="14" width="8" height="6" rx="2" fill="#87CEEB" opacity="0.6" />
      {/* Star decoration */}
      <path d="M24 22 L25.5 26 L29.5 26.5 L26.5 29 L27.5 33 L24 31 L20.5 33 L21.5 29 L18.5 26.5 L22.5 26 Z" fill="#F2C94C" opacity="0.5" />
    </svg>
  )
}

export default function Activities() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="activities" ref={sectionRef} className="py-20 md:py-28 px-4 bg-paper-cream/30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-sm uppercase tracking-[0.3em] text-sketch-gray mb-3">The Celebration</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-beret-blue">Desserts & Diapers</h2>
          <div className="mt-4 mx-auto w-16 h-px bg-warm-gold" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Desserts Card */}
          <div className={`${visible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-sketch-gray/10 h-full">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-warm-gold/10 flex items-center justify-center">
                  <EclairIcon />
                </div>
              </div>
              <h3 className="font-playfair text-2xl text-center text-charcoal mb-4">Sweet Treats</h3>
              <p className="text-center text-sketch-gray leading-relaxed">
                We&apos;ll be indulging in the finest sweet treats and eclairs at
                <span className="font-semibold text-charcoal"> Eclair Affaire</span>!
                Join us for an afternoon of Parisian-inspired dessert tasting.
              </p>
            </div>
          </div>

          {/* Diaper Raffle Card */}
          <div className={`${visible ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border-2 border-dashed border-beret-blue/30 h-full relative overflow-hidden">
              {/* Ticket-style decorative edges */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-paper-white rounded-full" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-paper-white rounded-full" />

              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-beret-blue/10 flex items-center justify-center">
                  <DiaperIcon />
                </div>
              </div>
              <h3 className="font-playfair text-2xl text-center text-charcoal mb-4">The Diaper Raffle</h3>
              <p className="text-center text-sketch-gray leading-relaxed mb-4">
                To help the parents-to-be, please consider participating in our Diaper Raffle.
              </p>
              <div className="bg-beret-blue/5 rounded-xl p-4 text-center">
                <p className="text-charcoal font-medium text-sm leading-relaxed">
                  Simply bring a pack of diapers (any size or brand) to be entered into a drawing to win a fantastic prize!
                </p>
                <p className="text-beret-blue font-semibold text-xs mt-2 uppercase tracking-wider">
                  One ticket per pack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
