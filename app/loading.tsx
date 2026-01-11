'use client';

import { Noto_Serif, Noto_Sans } from 'next/font/google';
import { useState, useEffect } from 'react';

const notoSerif = Noto_Serif({
    subsets: ['latin'],
    variable: '--font-noto-serif',
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

const notoSans = Noto_Sans({
    subsets: ['latin'],
    variable: '--font-noto-sans',
    weight: ['300', '400', '500'],
    display: 'swap',
});

export default function Loading() {
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Wait for fade out animation to finish before unmounting (700ms matching CSS)
            setTimeout(() => setShouldRender(false), 700);
        }, 1000); // 4.5s to show full progress bar then fade out

        return () => clearTimeout(timer);
    }, []);

    // Don't render anything after loading is complete to prevent z-index issues
    if (!shouldRender) return null;

    return (
        <div className={`${notoSerif.variable} ${notoSans.variable} font-display fixed inset-0 flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-background-dark overflow-hidden z-[9999] transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col items-center gap-12">
                {/* Minimalist Sun Icon */}
                <div className="relative flex items-center justify-center animate-breathe">
                    {/* Circle */}
                    <div className="w-16 h-16 rounded-full border-[1.5px] border-primary/60 flex items-center justify-center bg-transparent">
                        <div className="w-8 h-8 rounded-full bg-primary shadow-lg shadow-primary/40"></div>
                    </div>
                    {/* Rays (Simplified Geometric) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-80">
                        {/* Rotating rays pattern */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                            <div
                                key={deg}
                                className="absolute h-24 w-[1px] bg-primary/30"
                                style={{ transform: `rotate(${deg}deg)` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Brand Name */}
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-charcoal dark:text-white text-xl md:text-2xl font-medium tracking-[0.4em] uppercase opacity-90 font-display">
                        Sun Enterprises
                    </h1>
                    <p className="text-charcoal/40 dark:text-white/40 font-body text-[10px] tracking-[0.2em] uppercase">
                        Sustainable Agriculture Solutions
                    </p>
                </div>
            </div>

            {/* Meta Text Bottom (Contextual) */}
            <div className="absolute bottom-12 flex flex-col items-center gap-4 w-full">
                <p className="text-charcoal/60 dark:text-white/60 font-body text-xs tracking-wide">
                    Initialising premium AgriTech experience
                </p>
            </div>

            {/* 1px Bottom Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal/5 dark:bg-white/10 overflow-hidden">
                <div className="h-full bg-primary shadow-[0_0_8px_rgba(253,194,18,0.8)] animate-progress-fill w-0" />
            </div>
        </div>
    );
}
