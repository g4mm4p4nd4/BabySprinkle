import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  const description = "Baby Sprinkle in honor of Victoria. Don't forget to bring diapers (size one and up, please no newborn) for the Diaper Raffle!"
  const startDate = "20260329T180000Z"
  const endDate = "20260329T200000Z"

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Panda and The Penguin//Baby Sprinkle//EN',
    'BEGIN:VEVENT',
    `UID:${new Date().getTime()}@thepandaandthepenguin.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${eventTitle}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

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
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-2 px-6 py-2.5 rounded-full border-2 
          font-bold text-xs uppercase tracking-widest transition-all duration-300
          ${open ? 'bg-beret-blue text-white border-beret-blue' : 'bg-transparent text-beret-blue border-beret-blue/20 hover:border-beret-blue hover:bg-beret-blue/5'}
          cursor-pointer
        `}
      >
        <span>📅</span>
        Add to Calendar
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 3.5L5 6.5L8 3.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mb-2 left-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-sketch-gray/10 py-3 z-50 origin-top-left overflow-hidden"
          >
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-paper-white transition-colors text-charcoal text-sm group"
              onClick={() => setOpen(false)}
            >
              <span className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center font-bold text-xs group-hover:bg-red-100 transition-colors">G</span>
              Google Calendar
            </a>
            <button
              onClick={downloadICS}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-paper-white transition-colors text-charcoal text-sm cursor-pointer group"
            >
              <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-xs group-hover:bg-gray-200 transition-colors"></span>
              Apple Calendar
            </button>
            <button
              onClick={downloadICS}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-paper-white transition-colors text-charcoal text-sm cursor-pointer group"
            >
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-xs group-hover:bg-blue-100 transition-colors">O</span>
              Outlook
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Details() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section id="details" className="py-32 px-4 relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={cardVariants} className="text-center mb-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-sketch-gray mb-4 font-bold">The Logistics</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-beret-blue">When & Where</h2>
          <div className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-warm-gold to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* WHEN CARD */}
          <motion.div variants={cardVariants} className="h-full">
            <div className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-sketch-gray/5 border border-sketch-gray/10 hover:shadow-2xl hover:shadow-beret-blue/5 transition-all duration-700 h-full flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-warm-gold/5 flex items-center justify-center mb-8 text-warm-gold group-hover:scale-110 transition-transform duration-500">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6L12 12L16 14" />
                </svg>
              </div>

              <h3 className="font-playfair text-3xl text-charcoal mb-6">When</h3>

              <div className="space-y-4 mb-10 flex-grow">
                <p className="text-2xl font-bold text-beret-blue">Sunday, March 29, 2026</p>
                <div className="w-12 h-px bg-warm-gold/20 mx-auto" />
                <p className="text-xl text-charcoal font-medium">2:00 PM – 4:00 PM</p>
                <p className="text-sm text-sketch-gray italic font-light tracking-wide">Afternoon Tea & Eclairs</p>
              </div>

              <div className="w-full pt-6 border-t border-sketch-gray/5">
                <CalendarDropdown />
              </div>
            </div>
          </motion.div>

          {/* WHERE CARD */}
          <motion.div variants={cardVariants} className="h-full">
            <div className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-sketch-gray/5 border border-sketch-gray/10 hover:shadow-2xl hover:shadow-sage/5 transition-all duration-700 h-full flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-sage/5 flex items-center justify-center mb-8 text-sage group-hover:scale-110 transition-transform duration-500">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <h3 className="font-playfair text-3xl text-charcoal mb-6">Where</h3>

              <div className="space-y-2 mb-10 flex-grow">
                <p className="text-2xl font-bold text-beret-blue">Eclair Affaire</p>
                <p className="text-lg text-charcoal">1150 Weston Rd</p>
                <p className="text-lg text-charcoal">Weston, FL 33326</p>
              </div>

              <div className="w-full pt-6 border-t border-sketch-gray/5">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=1150+Weston+Rd+Weston+FL+33326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-3 bg-sage text-white rounded-full
                             hover:bg-sage-light hover:shadow-xl hover:shadow-sage/20 transition-all duration-500 font-bold text-xs uppercase tracking-widest group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Get Directions</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M1 13L13 1M13 1H5M13 1V9" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Embed with better styling */}
        <motion.div
          variants={cardVariants}
          className="mt-20 rounded-[3rem] overflow-hidden shadow-2xl shadow-sketch-gray/10 border-8 border-white transition-transform hover:scale-[1.005] duration-700 relative group"
        >
          <iframe
            title="Eclair Affaire Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.0!2d-80.3995!3d26.1005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9a9f7c0b0b0b1%3A0x0!2s1150+Weston+Rd%2C+Weston%2C+FL+33326!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="450"
            style={{ border: 0, filter: 'grayscale(0.1) contrast(1.05)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          {/* Subtle overlay for map to blend it in */}
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-sketch-gray/10 rounded-[3rem]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
