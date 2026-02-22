import Hero from './components/Hero'
import Details from './components/Details'
import Activities from './components/Activities'
import RSVPForm from './components/RSVPForm'
import Registry from './components/Registry'
import Footer from './components/Footer'
import WatercolorBackground from './components/WatercolorBackground'
import ThemeToggle from './components/ThemeToggle'
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
    <div className="min-h-screen bg-paper-white dark:bg-dark-bg transition-colors duration-700 selection:bg-beret-blue selection:text-white relative z-0">
      <WatercolorBackground />
      {/* Sticky nav for quick RSVP access and theme toggle */}
      <nav
        className={`fixed top-0 right-0 left-0 z-50 p-4 flex justify-between items-center transition-all duration-500 pointer-events-none
          ${scrolled ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4'}`}
      >
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
        <a
          href="#rsvp"
          className={`
            pointer-events-auto
            px-6 py-2.5 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all duration-300
            ${scrolled
              ? 'bg-beret-blue text-white hover:bg-beret-blue-light hover:shadow-beret-blue/30 dark:bg-beret-blue/80 dark:hover:bg-beret-blue'
              : 'bg-white dark:bg-dark-card text-beret-blue dark:text-beret-blue-light border border-beret-blue/20 dark:border-beret-blue/10 hover:bg-beret-blue hover:text-white dark:hover:bg-beret-blue dark:hover:text-white dark:hover:border-beret-blue'}
          `}
        >
          RSVP
        </a>
      </nav>

      <main>
        <Hero />
        <Details />
        <Activities />
        <Registry />
        <RSVPForm />
      </main>

      <Footer />
    </div>
  )
}

export default App
