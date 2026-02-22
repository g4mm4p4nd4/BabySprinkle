import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getEnvConfig } from '../config/env'
import { Turnstile } from '@marsidev/react-turnstile'

export default function RSVPForm() {
  const { rsvpEndpoint, isProd, isValidRsvpEndpoint } = getEnvConfig()
  const [status, setStatus] = useState('idle') // 'idle' | 'validating' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [flyPlane, setFlyPlane] = useState(false)

  const [mountTime, setMountTime] = useState(0)
  const [turnstileToken, setTurnstileToken] = useState('')

  useEffect(() => {
    setMountTime(Date.now())
  }, [])

  const trackRSVPEvent = (eventName, data = {}) => {
    console.log(`[RSVP Analytics] ${eventName}`, data)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, { event_category: 'RSVP', ...data })
    }
  }

  const [form, setForm] = useState({
    name: '',
    email: '',
    guests: '1',
    dietary: '',
    message: '',
    website: '', // honeypot
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    // Input normalization and max lengths
    let newValue = value
    if (name === 'name') newValue = value.slice(0, 100)
    if (name === 'email') newValue = value.slice(0, 255)
    if (name === 'dietary') newValue = value.slice(0, 200)
    if (name === 'message') newValue = value.slice(0, 500)

    setForm({ ...form, [name]: newValue })
    if (status === 'error') setStatus('idle')
    setErrorMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Honeypot check - reject silently
    if (form.website) {
      console.warn('Bot detected via honeypot')
      return
    }

    // 2. Minimum submit time check (3 seconds)
    if (Date.now() - mountTime < 3000) {
      setErrorMessage('Please take a moment to read the form before submitting.')
      setStatus('error')
      trackRSVPEvent('error', { reason: 'submit_too_fast' })
      return
    }

    // 3. Turnstile check
    const turnstileKey = import.meta.env.VITE_TURNSTILE_SITE_KEY
    if (!turnstileToken && (isProd || turnstileKey)) {
      setErrorMessage('Please complete the security check.')
      setStatus('error')
      trackRSVPEvent('error', { reason: 'turnstile_missing' })
      return
    }

    if (status === 'sending') return

    const isRetry = status === 'error'
    trackRSVPEvent(isRetry ? 'retry' : 'attempt', { guests: form.guests })

    setStatus('validating')
    setErrorMessage('')

    if (!form.name.trim() || !form.email.trim()) {
      setErrorMessage('Please fill in your name and email.')
      setStatus('error')
      trackRSVPEvent('error', { reason: 'validation_failed' })
      return
    }

    // 4. Per-session cooldown and duplicate suppression
    const payloadString = JSON.stringify(form)
    const lastSubmitTime = localStorage.getItem('rsvp_last_submit_time')
    const lastSubmitPayload = localStorage.getItem('rsvp_last_payload')

    if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime) < 60000) {
      setErrorMessage('Please wait a minute before submitting again.')
      setStatus('error')
      trackRSVPEvent('error', { reason: 'rate_limited_client' })
      return
    }

    if (lastSubmitPayload === payloadString) {
      setErrorMessage('This exact RSVP has already been submitted.')
      setStatus('error')
      trackRSVPEvent('error', { reason: 'duplicate_payload' })
      return
    }

    setStatus('sending')
    setFlyPlane(true)

    try {
      // Normalizing strings
      const normalizedForm = {
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        dietary: form.dietary.trim(),
        message: form.message.trim(),
        'cf-turnstile-response': turnstileToken
      }
      const urlEncodedData = new URLSearchParams(normalizedForm).toString()

      if (isValidRsvpEndpoint) {
        await fetch(rsvpEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: urlEncodedData,
        })
      } else {
        throw new Error('Invalid or missing RSVP endpoint configuration.')
      }

      trackRSVPEvent('sent')
      setStatus('success')
      localStorage.setItem('rsvp_last_submit_time', Date.now().toString())
      localStorage.setItem('rsvp_last_payload', payloadString)
    } catch (err) {
      console.error('RSVP Submission Error:', err)
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('error')
      trackRSVPEvent('error', { reason: 'network_exception', details: err.message })
      setFlyPlane(false)
    }
  }

  const inputClasses = `
    w-full px-6 py-4 rounded-2xl border-2 border-sketch-gray/10 dark:border-dark-border bg-white dark:bg-dark-bg
    text-charcoal dark:text-paper-cream placeholder-sketch-gray/40 dark:placeholder-sketch-gray/60 font-lato
    focus:outline-none focus:border-sage/50 dark:focus:border-sage-light focus:ring-8 focus:ring-sage/5 dark:focus:ring-sage/10
    transition-all duration-300 text-base shadow-sm
  `

  const labelClasses = "block text-[10px] font-bold text-sketch-gray dark:text-sketch-gray/80 mb-2 uppercase tracking-[0.2em] ml-2"

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
          <p className="text-[10px] uppercase tracking-[0.4em] text-sketch-gray dark:text-sketch-gray/80 mb-4 font-bold">Répondez s'il vous plaît</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-beret-blue dark:text-beret-blue-light">Join the Celebration</h2>
          <div className="mt-8 mx-auto w-16 h-px bg-warm-gold" />
          <p className="mt-8 text-charcoal dark:text-paper-cream text-xl font-light italic">
            Kindly reply by <span className="font-bold text-beret-blue dark:text-beret-blue-light not-italic">    March 15, 2026 </span>
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div variants={itemVariants} className="relative">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-white dark:bg-dark-card rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-sage/10 border border-sage/10 text-center relative overflow-hidden"
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

                <h3 className="font-script text-6xl md:text-8xl text-beret-blue dark:text-beret-blue-light mb-8">Merci!</h3>
                <p className="text-charcoal dark:text-paper-cream text-2xl mb-4 font-medium">Request sent.</p>
                <p className="text-sketch-gray dark:text-sketch-gray/80 text-lg mb-8 max-w-sm mx-auto font-light italic">
                  We&apos;ve sent your RSVP to the host. If you don&apos;t receive a confirmation soon, please try again or contact the host.
                </p>

                <div className="inline-block bg-[#f8f6f2] dark:bg-dark-bg rounded-3xl px-10 py-5 border border-sketch-gray/5 dark:border-dark-border mb-8">
                  <p className="font-playfair text-xl text-charcoal dark:text-paper-cream italic">
                    See you in Paris! <span className="text-xs not-italic opacity-40 ml-2 uppercase font-bold tracking-widest">(aka Weston)</span>
                  </p>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      setStatus('idle')
                      setFlyPlane(false)
                    }}
                    className="text-sm font-bold text-beret-blue hover:text-sage transition-colors underline underline-offset-4"
                  >
                    Send another RSVP
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="bg-white dark:bg-dark-card rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-sketch-gray/5 border border-sketch-gray/10 dark:border-dark-border relative overflow-hidden"
              >
                {/* Elegant top accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-beret-blue via-sage to-warm-gold opacity-60" />

                <div className="space-y-8">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                    value={form.website}
                    onChange={handleChange}
                    className="absolute opacity-0 -z-10 w-0 h-0"
                    aria-hidden="true"
                  />

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
                        <input
                          id="guests"
                          name="guests"
                          type="text"
                          readOnly
                          value="1 Guest"
                          className={`${inputClasses} bg-sketch-gray/5 dark:bg-sketch-gray/10 text-sketch-gray/60 cursor-not-allowed focus:ring-0 focus:border-sketch-gray/10 dark:focus:border-dark-border`}
                          title="RSVPs are limited to 1 guest"
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-sketch-gray/40 dark:text-sketch-gray/60">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
                      Note for Victoria <span className="text-sketch-gray/40 lowercase tracking-normal ml-2 italic">(Optional)</span>
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

                {/* Cloudflare Turnstile */}
                {(isProd || import.meta.env.VITE_TURNSTILE_SITE_KEY) && (
                  <div className="flex justify-center mt-8">
                    <Turnstile
                      siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                      onSuccess={(token) => {
                        setTurnstileToken(token)
                        if (status === 'error') setStatus('idle')
                        setErrorMessage('')
                      }}
                      onError={() => {
                        setErrorMessage('Security check failed. Please try again.')
                        setStatus('error')
                      }}
                      options={{
                        theme: 'light'
                      }}
                    />
                  </div>
                )}

                {/* Error State */}
                <AnimatePresence>
                  {errorMessage && (
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
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Admin Error State (Non-Production) */}
                {!isValidRsvpEndpoint && !isProd && (
                  <div className="mt-8 p-4 rounded-2xl bg-orange-50 text-orange-800 text-sm text-center border border-orange-200">
                    <strong>Admin Error:</strong> <code>VITE_RSVP_ENDPOINT</code> is missing or invalid in your .env file. Form submission is disabled.
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-12 text-center relative z-10">
                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'validating' || !isValidRsvpEndpoint}
                    className="w-full relative px-10 py-5 bg-beret-blue text-white font-bold text-xl rounded-full
                               shadow-xl shadow-beret-blue/20 hover:shadow-2xl hover:shadow-beret-blue/40
                               hover:-translate-y-1 active:translate-y-0
                               transition-all duration-500 ease-out
                               disabled:opacity-70 disabled:cursor-not-allowed
                               cursor-pointer overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    {status === 'sending' || status === 'validating' ? (
                      <span className="relative flex items-center justify-center gap-4">
                        <svg className="animate-spin w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20" />
                          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {status === 'validating' ? 'Validating...' : 'Sending...'}
                      </span>
                    ) : (
                      <span className="relative flex items-center justify-center gap-4">
                        {status === 'error' ? 'Retry RSVP' : 'Send RSVP'}
                        <motion.img
                          src="/watercolor-rsvp-seal.svg"
                          alt="Send RSVP"
                          width="48"
                          height="48"
                          className="group-hover:rotate-12 transition-transform duration-300"
                          animate={flyPlane ? {
                            x: [0, -10, 400],
                            y: [0, 10, -200],
                            rotate: [0, -10, 45],
                            opacity: [1, 1, 0]
                          } : {}}
                          transition={{ duration: 1.2, ease: "easeIn" }}
                          style={{ objectFit: 'contain' }}
                        />
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
