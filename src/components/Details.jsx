import { useEffect, useRef, useState } from 'react'

function CalendarDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const eventTitle = "Victoria's Baby Sprinkle"
  const location = "Eclair Affaire, 1150 Weston Rd, Weston, FL 33326"
  const description = "Baby Sprinkle in honor of Victoria. Don't forget to bring diapers for the Diaper Raffle!"
  const startDate = "20260329T180000Z" // 2:00 PM ET = 6:00 PM UTC
  const endDate = "20260329T200000Z"   // 4:00 PM ET = 8:00 PM UTC

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventTitle}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`

  const downloadICS = () => {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'victorias-baby-sprinkle.ics'
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-beret-blue text-beret-blue rounded-full
                   hover:bg-beret-blue hover:text-white transition-all duration-300 text-sm font-semibold cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="3" width="14" height="12" rx="2" />
          <path d="M1 7 L15 7" />
          <path d="M5 1 L5 5" />
          <path d="M11 1 L11 5" />
        </svg>
        Add to Calendar
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"
             className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M2 4 L5 7 L8 4" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-xl border border-sketch-gray/20 py-2 min-w-[180px] z-20">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-paper-white transition-colors text-sm text-charcoal"
            onClick={() => setOpen(false)}
          >
            <span className="text-lg">📅</span> Google Calendar
          </a>
          <button
            onClick={downloadICS}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-paper-white transition-colors text-sm text-charcoal cursor-pointer"
          >
            <span className="text-lg">🍎</span> Apple Calendar
          </button>
          <button
            onClick={downloadICS}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-paper-white transition-colors text-sm text-charcoal cursor-pointer"
          >
            <span className="text-lg">📧</span> Outlook
          </button>
        </div>
      )}
    </div>
  )
}

export default function Details() {
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
    <section id="details" ref={sectionRef} className="py-20 md:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-sm uppercase tracking-[0.3em] text-sketch-gray mb-3">The Details</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-beret-blue">When & Where</h2>
          <div className="mt-4 mx-auto w-16 h-px bg-warm-gold" />
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* When */}
          <div className={`${visible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-sketch-gray/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-warm-gold/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#F2C94C" strokeWidth="1.8">
                    <circle cx="10" cy="10" r="8" />
                    <path d="M10 5 L10 10 L14 12" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-playfair text-2xl text-charcoal">When</h3>
              </div>

              <div className="space-y-3 text-charcoal">
                <p className="text-lg font-semibold">Sunday, March 29, 2026</p>
                <p className="text-lg">2:00 PM &ndash; 4:00 PM</p>
                <p className="text-sm text-sketch-gray">Afternoon Tea Timeframe</p>
              </div>

              <div className="mt-8">
                <CalendarDropdown />
              </div>
            </div>
          </div>

          {/* Where */}
          <div className={`${visible ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-sketch-gray/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8FA878" strokeWidth="1.8">
                    <path d="M10 2 C6 2, 3 5.5, 3 9 C3 14, 10 18, 10 18 C10 18, 17 14, 17 9 C17 5.5, 14 2, 10 2 Z" />
                    <circle cx="10" cy="9" r="2.5" />
                  </svg>
                </div>
                <h3 className="font-playfair text-2xl text-charcoal">Where</h3>
              </div>

              <div className="space-y-2 text-charcoal">
                <p className="text-lg font-semibold">Eclair Affaire</p>
                <p className="text-base">1150 Weston Rd.</p>
                <p className="text-base">Weston, FL 33326</p>
                <p className="text-sm text-sage font-medium mt-3">Valet and Self-Parking Available</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=1150+Weston+Rd+Weston+FL+33326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sage text-white rounded-full
                             hover:bg-sage-light transition-colors text-sm font-semibold"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 1 L7 13 M1 7 L7 1 L13 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map embed */}
        <div className={`mt-12 rounded-2xl overflow-hidden shadow-sm border border-sketch-gray/10 ${visible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <iframe
            title="Eclair Affaire Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.0!2d-80.3995!3d26.1005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9a9f7c0b0b0b1%3A0x0!2s1150+Weston+Rd%2C+Weston%2C+FL+33326!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}
