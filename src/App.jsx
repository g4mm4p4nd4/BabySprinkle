import Hero from './components/Hero'
import Details from './components/Details'
import Activities from './components/Activities'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-paper-white selection:bg-beret-blue selection:text-white">
      {/* Sticky nav for quick RSVP access */}
      <nav
        className={`fixed top-0 right-0 left-0 z-50 p-4 flex justify-end transition-all duration-500 pointer-events-none
          ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4'}`}
      >
        <a
          href="#rsvp"
          className={`
            pointer-events-auto
            px-6 py-2.5 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all duration-300
            ${scrolled
              ? 'bg-beret-blue text-white hover:bg-beret-blue-light hover:shadow-beret-blue/30'
              : 'bg-white text-beret-blue border border-beret-blue/20 hover:bg-beret-blue hover:text-white'}
          `}
        >
          RSVP
        </a>
      </nav>

      <main>
        <Hero />
        <Details />
        <Activities />
        <RSVPForm />
      </main>

      <Footer />
    </div>
  )
}

export default App
