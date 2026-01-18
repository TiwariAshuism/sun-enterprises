'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero({ data }: { data: any }) {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const videos = [
        '/video/Home-page-v01.mp4',
        '/video/Home-page-v02.mp4',
        '/video/Home-page-v03.mp4',
        '/video/Home-page-v04.mp4'
    ];

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
        },
    };

    return (
        <main className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <motion.video
                    key={videos[currentVideoIndex]}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    src={videos[currentVideoIndex]}
                    onEnded={handleVideoEnd}
                    preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/60 to-white/30 dark:from-background-dark/90 dark:via-background-dark/50 dark:to-background-dark/20" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
            </motion.div>

            <motion.div
                style={{ opacity }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center gap-8 mt-16 md:mt-0"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-charcoal dark:text-white leading-[1.1]"
                >
                    {data.headline} <br className="hidden md:block" />
                    {data.highlightedWords.map((word: string, idx: number) => (
                        <span key={idx}>
                            <motion.span
                                initial={{ backgroundPosition: '0% 50%' }}
                                animate={{ backgroundPosition: '100% 50%' }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-500 dark:from-primary dark:via-yellow-300 dark:to-primary bg-[length:200%_auto]"
                            >
                                {word}
                            </motion.span>
                            {idx < data.highlightedWords.length - 1 && ' and '}
                            {idx === data.highlightedWords.length - 1 && '.'}
                        </span>
                    ))}
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-charcoal dark:text-white max-w-2xl font-semibold leading-relaxed drop-shadow-lg"
                >
                    {data.subheadline}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-4"
                >
                    {data.cta.map((button: any, idx: number) => (
                        <motion.a
                            key={idx}
                            href={button.href}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                className={`flex items-center justify-center h-14 px-8 rounded-full font-bold text-base transition-all duration-300 ${button.type === 'primary'
                                    ? 'bg-primary hover:bg-primary-hover text-charcoal shadow-lg shadow-yellow-500/20'
                                    : 'bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-charcoal dark:text-white hover:bg-white dark:hover:bg-white/10'
                                    }`}
                            >
                                <span>{button.text}</span>
                                {button.type === 'primary' && (
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="material-symbols-outlined ml-2 text-[20px]"
                                    >
                                        arrow_forward
                                    </motion.span>
                                )}
                            </button>
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
            >
                <span className="text-xs font-medium tracking-widest uppercase text-charcoal dark:text-white">
                    Scroll
                </span>
                <span className="material-symbols-outlined text-charcoal dark:text-white">
                    keyboard_arrow_down
                </span>
            </motion.div>
        </main>
    );
}
