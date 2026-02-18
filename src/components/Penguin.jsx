export default function Penguin() {
  return (
    <svg
      viewBox="0 0 180 220"
      className="w-28 md:w-36 lg:w-40 h-auto animate-bounce-in delay-1500"
      aria-label="Penguin wearing a blue beret"
    >
      {/* Watercolor-style body - main black body */}
      <ellipse cx="90" cy="140" rx="52" ry="65" fill="#2d2d2d" opacity="0.9" />

      {/* White belly */}
      <ellipse cx="90" cy="148" rx="32" ry="48" fill="white" opacity="0.95" />

      {/* Warm gold chest highlight */}
      <ellipse cx="90" cy="130" rx="24" ry="20" fill="#F2C94C" opacity="0.3" />

      {/* Head */}
      <circle cx="90" cy="72" r="35" fill="#2d2d2d" opacity="0.92" />

      {/* White face patch */}
      <ellipse cx="90" cy="78" rx="22" ry="18" fill="white" opacity="0.9" />

      {/* Eyes */}
      <circle cx="79" cy="72" r="5" fill="#2d2d2d" />
      <circle cx="101" cy="72" r="5" fill="#2d2d2d" />
      <circle cx="80.5" cy="70.5" r="1.8" fill="white" />
      <circle cx="102.5" cy="70.5" r="1.8" fill="white" />

      {/* Beak */}
      <path d="M85 82 L90 90 L95 82 Z" fill="#E8963E" opacity="0.9" />

      {/* Blush cheeks */}
      <circle cx="72" cy="80" r="6" fill="#FFB5B5" opacity="0.3" />
      <circle cx="108" cy="80" r="6" fill="#FFB5B5" opacity="0.3" />

      {/* Beret - Beret Blue */}
      <ellipse cx="90" cy="48" rx="32" ry="10" fill="#4A74A3" opacity="0.9" />
      <path d="M60 48 C 60 28, 90 20, 95 22 C 105 25, 120 35, 120 48" fill="#4A74A3" opacity="0.85" />
      {/* Beret nub */}
      <circle cx="92" cy="24" r="4" fill="#4A74A3" />

      {/* Beret texture/highlight */}
      <path d="M70 40 C 78 32, 100 30, 110 42" fill="#5a8abf" opacity="0.3" />

      {/* Flippers/Wings */}
      <path d="M38 115 C 25 130, 28 160, 38 175" stroke="#2d2d2d" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M142 115 C 155 130, 152 160, 142 175" stroke="#2d2d2d" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.85" />

      {/* Feet */}
      <ellipse cx="72" cy="202" rx="16" ry="7" fill="#E8963E" opacity="0.85" />
      <ellipse cx="108" cy="202" rx="16" ry="7" fill="#E8963E" opacity="0.85" />

      {/* Watercolor splashes (decorative) */}
      <circle cx="35" cy="170" r="8" fill="#4A74A3" opacity="0.06" />
      <circle cx="150" cy="130" r="12" fill="#8FA878" opacity="0.06" />
      <circle cx="60" cy="195" r="6" fill="#F2C94C" opacity="0.08" />
    </svg>
  )
}
