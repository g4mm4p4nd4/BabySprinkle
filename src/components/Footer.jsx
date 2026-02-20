import { motion } from 'framer-motion'
import Penguin from './Penguin'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-24 px-4 text-center border-t border-sketch-gray/5 relative overflow-hidden bg-white">
      {/* Decorative center wash */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-warm-gold/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -8 }}
          whileActive={{ scale: 0.95 }}
          className="group flex flex-col items-center justify-center mb-12 mx-auto cursor-pointer transition-all duration-500"
          title="Back to Top"
        >
          <div className="w-20 h-20 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
            <img
              src={`${import.meta.env.BASE_URL}beretPenguin.png`}
              alt="Back to Top Penguin"
              className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="text-[10px] text-beret-blue font-bold uppercase tracking-[0.3em] mt-4"
          >
            Back to Top
          </motion.span>
        </motion.button>

        <h2 className="font-playfair text-3xl md:text-4xl text-beret-blue mb-6 tracking-wide">
          Victoria&apos;s Baby Sprinkle
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sketch-gray text-sm mb-12 font-light tracking-wide italic">
          <span>March 29, 2026</span>
          <span className="text-warm-gold not-italic">•</span>
          <span>Eclair Affaire</span>
          <span className="text-warm-gold not-italic">•</span>
          <span>Weston, FL</span>
        </div>

        <div className="pt-8 border-t border-sketch-gray/5">
          <p className="text-sketch-gray/40 text-[9px] font-bold tracking-[0.4em] uppercase">
            Made with love • Parisian Penguin Edition
          </p>
        </div>
      </div>
    </footer>
  )
}
