import { motion } from 'framer-motion'

const EclairIcon = () => (
  <motion.img
    src="/Penguineclair.png"
    alt="Sweet Treats"
    width="128"
    height="128"
    whileHover={{ rotate: 5, scale: 1.1 }}
    style={{ objectFit: 'contain' }}
  />
)

const DiaperIcon = () => (
  <motion.img
    src="/Penguindiaper.png"
    alt="Diaper Raffle"
    width="128"
    height="128"
    animate={{ rotate: [-2, 2, -2] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    style={{ objectFit: 'contain' }}
  />
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
    <section id="activities" className="py-32 px-4 bg-[#f8f6f2] dark:bg-dark-bg relative overflow-hidden transition-colors duration-700">
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
          <p className="text-[10px] uppercase tracking-[0.4em] text-sketch-gray dark:text-sketch-gray/80 mb-4 font-bold">The Celebration</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-beret-blue dark:text-beret-blue-light">Desserts & Diapers</h2>
          <div className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-warm-gold to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Desserts Card */}
          <motion.div variants={cardVariants}>
            <div className="bg-white dark:bg-dark-card rounded-[2.5rem] p-12 md:p-14 shadow-xl shadow-sketch-gray/5 border border-sketch-gray/10 dark:border-dark-border hover:shadow-2xl hover:shadow-warm-gold/5 transition-all duration-700 h-full flex flex-col items-center text-center group">
              <div className="w-40 h-40 rounded-full bg-warm-gold/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <EclairIcon />
              </div>

              <h3 className="font-playfair text-3xl text-charcoal dark:text-paper-cream mb-6">Sweet Treats</h3>
              <div className="w-16 h-px bg-warm-gold/20 mb-8" />

              <p className="text-sketch-gray dark:text-sketch-gray/80 leading-relaxed text-lg font-light italic">
                We&apos;ll be indulging in the finest eclairs and artisanal sweet treats at
                <span className="font-bold text-beret-blue dark:text-beret-blue-light block mt-4 text-5xl not-italic">Eclair Affaire</span>
              </p>
            </div>
          </motion.div>

          {/* Diaper Raffle Ticket */}
          <motion.div variants={cardVariants}>
            <div className="bg-white dark:bg-dark-card rounded-[2rem] p-12 md:p-14 shadow-xl shadow-sketch-gray/5 border-2 border-dashed border-beret-blue/20 dark:border-beret-blue/30 h-full relative overflow-hidden flex flex-col items-center text-center hover:border-beret-blue/40 transition-all duration-700 group">
              {/* Decorative ticket cutouts */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#f8f6f2] dark:bg-dark-bg rounded-full border border-sketch-gray/10 dark:border-dark-border shadow-inner transition-colors duration-700" />
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#f8f6f2] dark:bg-dark-bg rounded-full border border-sketch-gray/10 dark:border-dark-border shadow-inner transition-colors duration-700" />

              <div className="w-40 h-40 rounded-full bg-beret-blue/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <DiaperIcon />
              </div>

              <h3 className="font-playfair text-3xl text-charcoal dark:text-paper-cream mb-4">The Diaper Raffle</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-beret-blue dark:text-beret-blue-light font-bold mb-8 px-4 py-1 bg-beret-blue/5 dark:bg-beret-blue/10 rounded-full inline-block">Win a Prize</p>

              <div className="text-sketch-gray dark:text-sketch-gray/80 leading-relaxed mb-10 flex-grow font-light italic text-lg">
                <p className="mb-6">To help the parents-to-be, please consider participating in our Diaper Raffle.</p>
                <p className="text-charcoal dark:text-paper-cream font-medium not-italic text-xl">
                  Bring a pack of diapers (size one and up) to be entered into a drawing to win a fantastic prize!
                </p>
              </div>

              <div className="bg-beret-blue dark:bg-beret-blue/90 text-white px-8 py-3 rounded-full shadow-lg shadow-beret-blue/20 transform group-hover:scale-105 transition-transform duration-500">
                <div className="flex items-center gap-3">
                  <img src="/watercolor-raffle-ticket.svg" alt="Ticket" className="w-12 h-12 object-contain" />
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-0.5">
                    One Ticket Per Pack
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
