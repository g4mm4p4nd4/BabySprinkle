import { motion } from 'framer-motion'

const GiftIcon = () => (
    <motion.svg
        width="64" height="64" viewBox="0 0 56 56" fill="none"
        whileHover={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 0.5 }}
    >
        <rect x="14" y="24" width="28" height="22" rx="2" fill="#F9F9F9" stroke="#E2E8F0" strokeWidth="1.5" />
        <path d="M10 24 L46 24" stroke="#E2E8F0" strokeWidth="1.5" />
        <path d="M28 24 L28 46" stroke="#E2E8F0" strokeWidth="1.5" />
        {/* Bow loops */}
        <path d="M28 24 C 28 16, 18 16, 18 20 C 18 24, 28 24, 28 24 Z" fill="#4A74A3" opacity="0.1" stroke="#4A74A3" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M28 24 C 28 16, 38 16, 38 20 C 38 24, 28 24, 28 24 Z" fill="#4A74A3" opacity="0.1" stroke="#4A74A3" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Bow tails */}
        <path d="M26 24 C 24 28, 20 32, 16 34" stroke="#4A74A3" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 24 C 32 28, 36 32, 40 34" stroke="#4A74A3" strokeWidth="1.5" strokeLinecap="round" />
        {/* Subtle texture dots */}
        <circle cx="20" cy="35" r="1.2" fill="#4A74A3" opacity="0.1" />
        <circle cx="36" cy="35" r="1.2" fill="#4A74A3" opacity="0.1" />
    </motion.svg>
)

export default function Registry() {
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
        <section id="registry" className="py-24 px-4 bg-white relative">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto"
            >
                <motion.div variants={cardVariants} className="text-center mb-16">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-sketch-gray mb-4 font-bold">Gifts</p>
                    <h2 className="font-playfair text-4xl md:text-5xl text-beret-blue">Baby Registry</h2>
                    <div className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-warm-gold to-transparent" />
                </motion.div>

                <motion.div variants={cardVariants} className="max-w-2xl mx-auto">
                    <div className="bg-[#f8f6f2] rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-sketch-gray/5 border border-sketch-gray/10 hover:shadow-2xl hover:shadow-beret-blue/5 transition-all duration-700 h-full flex flex-col items-center text-center group relative overflow-hidden">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-[80px] group-hover:bg-beret-blue/5 transition-colors duration-700 translate-x-1/2 -translate-y-1/2" />

                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 z-10 border border-sketch-gray/5">
                            <GiftIcon />
                        </div>

                        <p className="text-sketch-gray leading-relaxed text-lg font-light italic mb-8 z-10">
                            Your presence is the greatest gift of all. If you wish to bless the growing family with a gift, they are registered at Babylist.
                        </p>

                        <a
                            href="https://my.babylist.com/victoria-pandapenguin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="z-10 bg-white text-beret-blue border border-beret-blue/20 px-10 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-beret-blue hover:text-white hover:border-beret-blue hover:shadow-xl hover:shadow-beret-blue/20 transition-all duration-500 transform group-hover:-translate-y-1 flex items-center justify-center gap-3"
                        >
                            Shop Registry
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1">
                                <path d="M1 13L13 1M13 1H5M13 1V9" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
