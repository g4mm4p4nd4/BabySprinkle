import { useState, useEffect, useRef } from 'react'

const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'

export default function RSVPForm() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

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
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('guests', form.guests)
      formData.append('dietary', form.dietary)
      formData.append('message', form.message)

      if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: formData,
        })
      }

      // Simulate a short delay for the animation
      await new Promise(resolve => setTimeout(resolve, 800))
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClasses = `w-full px-4 py-3 rounded-xl border border-sketch-gray/20 bg-white
    text-charcoal placeholder-sketch-gray/50
    focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20
    transition-all duration-300 text-base`

  return (
    <section id="rsvp" ref={sectionRef} className="py-20 md:py-28 px-4">
      <div className="max-w-xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-12 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-sm uppercase tracking-[0.3em] text-sketch-gray mb-3">
            R&eacute;pondez s&apos;il vous pla&icirc;t
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-beret-blue">RSVP</h2>
          <div className="mt-4 mx-auto w-16 h-px bg-warm-gold" />
          <p className="mt-4 text-sketch-gray text-sm">
            Kindly reply by <span className="font-semibold text-charcoal">March 15, 2026</span>.
          </p>
          <p className="text-sketch-gray text-xs mt-1">
            Please provide your email to receive an instant confirmation.
          </p>
        </div>

        {/* Form or Success */}
        {submitted ? (
          <div className="animate-bounce-in text-center bg-white rounded-2xl p-10 md:p-14 shadow-sm border border-sage/20">
            {/* Checkmark */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#8FA878" strokeWidth="2.5" strokeLinecap="round">
                <path d="M8 16 L14 22 L24 10" />
              </svg>
            </div>

            <h3 className="font-script text-4xl md:text-5xl text-beret-blue mb-4">Merci!</h3>
            <p className="text-charcoal text-lg mb-2">Your RSVP has been recorded.</p>
            <p className="text-sketch-gray text-sm mb-6">
              We have sent a confirmation email to your inbox with all the details.
            </p>

            <div className="inline-block bg-warm-gold/10 rounded-xl px-6 py-3">
              <p className="font-script text-lg text-charcoal">
                See you in Paris <span className="text-sketch-gray">(aka Weston)</span>!
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-sketch-gray/10 ${visible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}
          >
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">
                  Full Name <span className="text-beret-blue">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
                  Email Address <span className="text-beret-blue">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              {/* Number of guests */}
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-charcoal mb-1.5">
                  Number of Guests
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className={inputClasses + ' cursor-pointer'}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label htmlFor="dietary" className="block text-sm font-medium text-charcoal mb-1.5">
                  Dietary Restrictions
                </label>
                <textarea
                  id="dietary"
                  name="dietary"
                  rows="2"
                  placeholder="Any allergies or dietary needs..."
                  value={form.dietary}
                  onChange={handleChange}
                  className={inputClasses + ' resize-none'}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1.5">
                  Message <span className="text-sketch-gray text-xs">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  placeholder="A note for Victoria..."
                  value={form.message}
                  onChange={handleChange}
                  className={inputClasses + ' resize-none'}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="mt-8 text-center relative">
              <button
                type="submit"
                disabled={submitting}
                className="relative px-10 py-4 bg-beret-blue text-white font-semibold text-lg rounded-full
                           shadow-lg shadow-beret-blue/25 hover:shadow-xl hover:shadow-beret-blue/30
                           hover:-translate-y-0.5 active:translate-y-0
                           transition-all duration-300 ease-out
                           disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                           cursor-pointer"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send RSVP
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"
                         className={flyPlane ? 'animate-paper-plane' : ''}>
                      <path d="M2 9 L16 2 L9 16 L8 10 Z" strokeLinejoin="round" />
                      <path d="M8 10 L16 2" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
