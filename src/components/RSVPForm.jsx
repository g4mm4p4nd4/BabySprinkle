import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwQLLOJ7ndDktTi-9iXJLrzl96uY6e4dxyGSeWQFb5svsffGVkoR_f4XX4r0WCvFTOIkA/exec'

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [flyPlane, setFlyPlane] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    guests: '1',
    dietary: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim()) {
      setError('Please fill in your name and email.')
      return
    }

    setSubmitting(true)
    setFlyPlane(true)

    try {
      const urlEncodedData = new URLSearchParams(form).toString()

      if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT')) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: urlEncodedData,
        })
      }

      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClasses = `
    w-full px-6 py-4 rounded-2xl border-2 border-sketch-gray/10 bg-white
    text-charcoal placeholder-sketch-gray/40 font-lato
    focus:outline-none focus:border-sage/50 focus:ring-8 focus:ring-sage/5
    transition-all duration-300 text-base shadow-sm
  `

  const labelClasses = "block text-[10px] font-bold text-sketch-gray mb-2 uppercase tracking-[0.2em] ml-2"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section id="rsvp" className="py-32 px-4 relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-sketch-gray mb-4 font-bold">Répondez s'il vous plaît</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-beret-blue">Join the Celebration</h2>
          <div className="mt-8 mx-auto w-16 h-px bg-warm-gold" />
          <p className="mt-8 text-charcoal text-xl font-light italic">
            Kindly reply by <span className="font-bold text-beret-blue not-italic">March 15, 2026</span>
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div variants={itemVariants} className="relative">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-sage/10 border border-sage/10 text-center relative overflow-hidden"
              >
                {/* Decorative bursts */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-sage/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-beret-blue/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="w-24 h-24 mx-auto mb-10 rounded-full bg-sage/10 flex items-center justify-center text-sage">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>

                <h3 className="font-script text-6xl md:text-8xl text-beret-blue mb-8">Merci!</h3>
                <p className="text-charcoal text-2xl mb-4 font-medium">Your RSVP is confirmed.</p>
                <p className="text-sketch-gray text-lg mb-12 max-w-sm mx-auto font-light italic">
                  We&apos;ve sent the details to your inbox. Can&apos;t wait to see you!
                </p>

                <div className="inline-block bg-[#f8f6f2] rounded-3xl px-10 py-5 border border-sketch-gray/5">
                  <p className="font-playfair text-xl text-charcoal italic">
                    See you in Paris! <span className="text-xs not-italic opacity-40 ml-2 uppercase font-bold tracking-widest">(aka Weston)</span>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-sketch-gray/5 border border-sketch-gray/10 relative overflow-hidden"
              >
                {/* Elegant top accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-beret-blue via-sage to-warm-gold opacity-60" />

                <div className="space-y-8">
                  {/* Name */}
                  <div className="relative group">
                    <label htmlFor="name" className={labelClasses}>
                      Full Name <span className="text-beret-blue/40 font-normal ml-1 italic">(Required)</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Marie Antoinette"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email Address <span className="text-beret-blue/40 font-normal ml-1 italic">(Required)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="votre@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  {/* Two Column for smaller fields */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="guests" className={labelClasses}>
                        Guests
                      </label>
                      <div className="relative">
                        <select
                          id="guests"
                          name="guests"
                          value={form.guests}
                          onChange={handleChange}
                          className={inputClasses + ' appearance-none cursor-pointer'}
                        >
                          {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-sketch-gray/40">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M2 4L6 8L10 4" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dietary" className={labelClasses}>
                        Dietary Notes
                      </label>
                      <input
                        id="dietary"
                        name="dietary"
                        type="text"
                        placeholder="e.g. Vegan, Nut Allergy"
                        value={form.dietary}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      Note for Victoria <span className="text-sketch-gray/30 lowercase tracking-normal ml-2 italic">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      placeholder="Leave a sweet message..."
                      value={form.message}
                      onChange={handleChange}
                      className={inputClasses + ' resize-none'}
                    />
                  </div>
                </div>

                {/* Error State */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-8 p-4 rounded-2xl bg-red-50 text-red-600 text-sm text-center border border-red-100 flex items-center justify-center gap-2 overflow-hidden"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <div className="mt-12 text-center relative z-10">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full relative px-10 py-5 bg-beret-blue text-white font-bold text-xl rounded-full
                               shadow-xl shadow-beret-blue/20 hover:shadow-2xl hover:shadow-beret-blue/40
                               hover:-translate-y-1 active:translate-y-0
                               transition-all duration-500 ease-out
                               disabled:opacity-70 disabled:cursor-not-allowed
                               cursor-pointer overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    {submitting ? (
                      <span className="relative flex items-center justify-center gap-4">
                        <svg className="animate-spin w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20" />
                          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="relative flex items-center justify-center gap-4">
                        Send RSVP
                        <motion.svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:rotate-12 transition-transform duration-300"
                          animate={flyPlane ? {
                            x: [0, -10, 400],
                            y: [0, 10, -200],
                            rotate: [0, -10, 45],
                            opacity: [1, 1, 0]
                          } : {}}
                          transition={{ duration: 1.2, ease: "easeIn" }}
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </motion.svg>
                      </span>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}
