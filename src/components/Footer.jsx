export default function Footer() {
  return (
    <footer className="py-12 px-4 text-center border-t border-sketch-gray/10">
      <div className="max-w-2xl mx-auto">
        {/* Decorative penguin mini */}
        <div className="flex justify-center mb-4">
          <svg width="32" height="38" viewBox="0 0 180 220" fill="none" aria-hidden="true" className="opacity-30">
            <ellipse cx="90" cy="140" rx="52" ry="65" fill="#2d2d2d" />
            <ellipse cx="90" cy="148" rx="32" ry="48" fill="white" />
            <circle cx="90" cy="72" r="35" fill="#2d2d2d" />
            <ellipse cx="90" cy="78" rx="22" ry="18" fill="white" />
            <circle cx="79" cy="72" r="5" fill="#2d2d2d" />
            <circle cx="101" cy="72" r="5" fill="#2d2d2d" />
            <path d="M85 82 L90 90 L95 82 Z" fill="#E8963E" />
            <ellipse cx="90" cy="48" rx="32" ry="10" fill="#4A74A3" />
            <path d="M60 48 C 60 28, 90 20, 95 22 C 105 25, 120 35, 120 48" fill="#4A74A3" />
          </svg>
        </div>

        <p className="font-script text-xl text-beret-blue mb-2">
          Victoria&apos;s Baby Sprinkle
        </p>
        <p className="text-sketch-gray text-xs">
          March 29, 2026 &bull; Eclair Affaire &bull; Weston, FL
        </p>
        <p className="text-sketch-gray/50 text-xs mt-4">
          Made with love for Victoria and the little one.
        </p>
      </div>
    </footer>
  )
}
