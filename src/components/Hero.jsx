import EiffelTower from './EiffelTower'
import Penguin from './Penguin'
import { motion } from 'framer-motion'

export default function Hero() {

  const scrollToRSVP = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 4.5 /* Wait for Eiffel Tower (~3.8s) + 0.5s pause */
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      clipPath: 'polygon(0 -20%, 0 -20%, 0 120%, 0 120%)',
      y: 10
    },
    visible: {
      opacity: 1,
      clipPath: 'polygon(0 -20%, 120% -20%, 120% 120%, 0 120%)',
      y: 0,
      transition: { duration: 1.2, ease: "easeInOut" }
    }
  }

  return (
    <section className="min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative center background wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none -z-10 opacity-40">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-beret-blue/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-sage/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col md:flex-row-reverse items-center justify-start md:justify-between min-h-[100dvh] pt-28 md:pt-20 pb-16 relative z-10">

        {/* Eiffel Tower — background on mobile, right panel on desktop */}
        <div
          className="absolute inset-0 md:relative md:w-1/2 flex items-start md:items-center justify-center pointer-events-none z-0 opacity-40 md:opacity-100 overflow-hidden md:overflow-visible pt-28 md:pt-0"
        >
          <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[450px] lg:max-w-[550px] md:-mt-24" style={{ overflow: 'visible' }}>
            <EiffelTower />
          </div>
        </div>



        {/* Text Content with Framer Motion Stagger */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative z-10 pt-8 pb-12 md:py-0">

          {/* Stronger mobile readability backing */}
          <div className="absolute inset-0 bg-white/40 md:bg-transparent blur-xl md:blur-none md:hidden -z-10 scale-150" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center md:items-start gap-2 md:gap-4 w-full"
          >
            <motion.p
              variants={itemVariants}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-sketch-gray font-medium"
            >
              Join us for a Parisian
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-playfair text-5xl md:text-7xl lg:text-9xl font-bold text-beret-blue leading-tight tracking-tight px-2"
            >
              Baby Sprinkle
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center -mt-2 md:-mt-4"
            >
              <span className="text-sketch-gray text-xs md:text-sm uppercase tracking-widest italic mb-1">In Honor of</span>
              <p className="font-script text-5xl md:text-7xl lg:text-8xl text-charcoal transform -rotate-1 px-4">
                Victoria
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-4 justify-center opacity-40">
                <span className="block w-12 md:w-20 h-px bg-warm-gold" />
                <span className="text-warm-gold text-sm">✦</span>
                <span className="block w-12 md:w-20 h-px bg-warm-gold" />
              </div>

              <p className="text-sketch-gray text-lg md:text-xl font-light max-w-md mx-auto italic">
                A sweet celebration of the new arrival.
              </p>
            </motion.div>

            {/* The dynamically positioned Penguin waddling INTO the document flow */}
            <div className="mt-4 mb-2 flex justify-center md:justify-start w-full">
              <div className="relative w-[100px] sm:w-[130px] md:w-[206px] lg:w-[244px] h-[100px] sm:h-[130px] md:h-[200px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    opacity: [0, 1, 1, 1, 1, 1],
                    x: ['40vw', '30vw', '20vw', '10vw', '5vw', '0vw'],
                    y: ['-30vh', '-20vh', '-10vh', '-5vh', '-2vh', '0vh'],
                    rotate: [0, 10, -10, 10, -8, 0],
                    scale: [0.6, 0.65, 0.75, 0.85, 0.95, 1],
                  }}
                  transition={{
                    delay: 2.0,
                    duration: 8.0,
                    ease: "easeInOut",
                    times: [0, 0.15, 0.35, 0.55, 0.75, 1],
                  }}
                  onAnimationComplete={() => {
                    if (window.__triggerPenguinSwap) {
                      window.__triggerPenguinSwap()
                    }
                  }}
                  className="absolute bottom-0 left-0 z-20 w-full"
                >
                  <Penguin onAnimationDone={(swapFn) => {
                    window.__triggerPenguinSwap = swapFn
                  }} />
                </motion.div>
              </div>
            </div>

            <motion.div variants={itemVariants} className="mt-4">
              <button
                onClick={scrollToRSVP}
                className="group relative px-12 py-5 bg-beret-blue text-white font-bold text-xl rounded-full
                        shadow-2xl shadow-beret-blue/30 overflow-hidden
                        transition-all duration-500 ease-out
                        hover:shadow-beret-blue/50 hover:-translate-y-1.5 active:translate-y-0
                        cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-3">
                  RSVP Now
                  <svg
                    className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                {/* Glossy hover effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-3 text-sketch-gray/40"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-bold">Discover More</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-warm-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
