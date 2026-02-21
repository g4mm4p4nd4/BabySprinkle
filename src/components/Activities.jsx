import { motion } from 'framer-motion'

const EclairIcon = () => (
  <motion.svg
    width="64" height="64" viewBox="0 0 56 56" fill="none"
    whileHover={{ rotate: 5, scale: 1.1 }}
  >
    <ellipse cx="28" cy="32" rx="22" ry="12" fill="#D4A574" />
    <path d="M10 28 C 10 22, 18 18, 28 18 C 38 18, 46 22, 46 28 C 46 32, 38 25, 28 25 C 18 25, 10 32, 10 28 Z" fill="#5D4037" />
    <motion.ellipse
      cx="28" cy="34" rx="18" ry="4" fill="#FFF8DC" opacity="0.8"
      animate={{ opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <path d="M22 22 Q 28 20 34 22" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </motion.svg>
)

const DiaperIcon = () => (
  <motion.svg
    width="64" height="64" viewBox="0 0 56 56" fill="none"
    animate={{ rotate: [-2, 2, -2] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M12 18 L44 18 L46 28 C 46 40, 38 46, 28 46 C 18 46, 10 40, 10 28 Z" fill="#F9F9F9" stroke="#E2E8F0" strokeWidth="1.5" />
    <rect x="10" y="18" width="10" height="8" rx="2" fill="#4A74A3" opacity="0.3" />
    <rect x="36" y="18" width="10" height="8" rx="2" fill="#4A74A3" opacity="0.3" />
    {/* Subtle texture dots */}
    <circle cx="20" cy="35" r="1.2" fill="#4A74A3" opacity="0.1" />
    <circle cx="36" cy="35" r="1.2" fill="#4A74A3" opacity="0.1" />
    <circle cx="28" cy="40" r="1.2" fill="#4A74A3" opacity="0.1" />
  </motion.svg>
)

export default function Activities() {
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
    <section id="activities" className="py-32 px-4 bg-[#f8f6f2] relative overflow-hidden">
      {/* Decorative center wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-warm-gold/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-beret-blue/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div variants={cardVariants} className="text-center mb-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-sketch-gray mb-4 font-bold">The Celebration</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-beret-blue">Desserts & Diapers</h2>
          <div className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-warm-gold to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Desserts Card */}
          <motion.div variants={cardVariants}>
            <div className="bg-white rounded-[2.5rem] p-12 md:p-14 shadow-xl shadow-sketch-gray/5 border border-sketch-gray/10 hover:shadow-2xl hover:shadow-warm-gold/5 transition-all duration-700 h-full flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-warm-gold/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <EclairIcon />
              </div>

              <h3 className="font-playfair text-3xl text-charcoal mb-6">Sweet Treats</h3>
              <div className="w-16 h-px bg-warm-gold/20 mb-8" />

              <p className="text-sketch-gray leading-relaxed text-lg font-light italic">
                We&apos;ll be indulging in the finest eclairs and artisanal sweet treats at
                <span className="font-bold text-beret-blue block mt-3 text-2xl not-italic">Eclair Affaire</span>
              </p>
            </div>
          </motion.div>

          {/* Diaper Raffle Ticket */}
          <motion.div variants={cardVariants}>
            <div className="bg-white rounded-[2rem] p-12 md:p-14 shadow-xl shadow-sketch-gray/5 border-2 border-dashed border-beret-blue/20 h-full relative overflow-hidden flex flex-col items-center text-center hover:border-beret-blue/40 transition-all duration-700 group">
              {/* Decorative ticket cutouts */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#f8f6f2] rounded-full border border-sketch-gray/10 shadow-inner" />
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#f8f6f2] rounded-full border border-sketch-gray/10 shadow-inner" />

              <div className="w-24 h-24 rounded-full bg-beret-blue/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <DiaperIcon />
              </div>

              <h3 className="font-playfair text-3xl text-charcoal mb-4">The Diaper Raffle</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-beret-blue font-bold mb-8 px-4 py-1 bg-beret-blue/5 rounded-full inline-block">Win a Prize</p>

              <div className="text-sketch-gray leading-relaxed mb-10 flex-grow font-light italic text-lg">
                <p className="mb-6">To help the parents-to-be, please consider participating in our Diaper Raffle.</p>
                <p className="text-charcoal font-medium not-italic text-xl">
                  Bring a pack of diapers (size one and up, please no newborn) to be entered into a drawing to win a fantastic prize!
                </p>
              </div>

              <div className="bg-beret-blue text-white px-8 py-3 rounded-full shadow-lg shadow-beret-blue/20 transform group-hover:scale-105 transition-transform duration-500">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  🎟️ One Ticket Per Pack
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
