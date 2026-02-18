import EiffelTower from './EiffelTower'
import Penguin from './Penguin'

export default function Hero() {
  const scrollToRSVP = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Decorative watercolor blobs */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-beret-blue/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-sage/5 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-warm-gold/5 blur-2xl" />

      {/* Main content */}
      <div className="flex flex-col items-center gap-6 md:gap-8 max-w-2xl mx-auto text-center">
        {/* Eiffel Tower + Penguin row */}
        <div className="flex items-end justify-center gap-4 md:gap-8 mb-4">
          <EiffelTower />
          <div className="animate-float">
            <Penguin />
          </div>
        </div>

        {/* Text content */}
        <p className="text-sm md:text-base uppercase tracking-[0.3em] text-sketch-gray animate-fade-in-up delay-200 font-light">
          Join us for a Parisian
        </p>

        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-beret-blue animate-fade-in-up delay-400 leading-tight">
          Baby Sprinkle
        </h1>

        <p className="font-script text-2xl md:text-4xl text-charcoal animate-fade-in-up delay-600">
          In Honor of Victoria
        </p>

        <p className="text-sketch-gray text-base md:text-lg animate-fade-in-up delay-800 font-light max-w-md">
          A sweet celebration of the new arrival.
        </p>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 animate-fade-in delay-1000">
          <span className="block w-12 h-px bg-warm-gold" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" fill="#F2C94C" />
          </svg>
          <span className="block w-12 h-px bg-warm-gold" />
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToRSVP}
          className="mt-4 px-10 py-4 bg-beret-blue text-white font-semibold text-lg rounded-full
                     shadow-lg shadow-beret-blue/25 hover:shadow-xl hover:shadow-beret-blue/30
                     hover:-translate-y-0.5 active:translate-y-0
                     transition-all duration-300 ease-out
                     animate-fade-in-up delay-1200
                     cursor-pointer"
        >
          RSVP Now
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 animate-fade-in delay-1500">
        <div className="flex flex-col items-center gap-2 text-sketch-gray/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce">
            <path d="M10 4 L10 16 M5 11 L10 16 L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
