import React from 'react';

export default function WatercolorBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-beret-blue/10 mix-blend-multiply blur-[80px] animate-blob-shape animate-blob-drift" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] bg-sage/10 mix-blend-multiply blur-[80px] animate-blob-shape animate-blob-drift origin-center" style={{ animationDelay: '-5s', animationDirection: 'reverse' }}></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-warm-gold/10 mix-blend-multiply blur-[80px] animate-blob-shape animate-blob-drift" style={{ animationDelay: '-10s' }}></div>
            <div className="absolute top-[40%] left-[40%] w-[35%] h-[35%] bg-beret-blue-light/5 mix-blend-multiply blur-[80px] animate-blob-shape animate-blob-drift" style={{ animationDelay: '-15s', animationDirection: 'reverse' }}></div>
        </div>
    );
}
