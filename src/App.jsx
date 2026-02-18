import Hero from './components/Hero'
import Details from './components/Details'
import Activities from './components/Activities'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-paper-white">
      {/* Sticky nav for quick RSVP access */}
      <nav className="fixed top-0 right-0 z-50 p-4">
        <a
          href="#rsvp"
          className="px-5 py-2 bg-white/80 backdrop-blur-sm text-beret-blue text-sm font-semibold
                     rounded-full shadow-md border border-beret-blue/20
                     hover:bg-beret-blue hover:text-white transition-all duration-300"
        >
          RSVP
        </a>
      </nav>

      <Hero />
      <Details />
      <Activities />
      <RSVPForm />
      <Footer />
    </div>
  )
}

export default App
