'use client';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

function Counter({ value, duration = 2 }: { value: string; duration?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const motionValue = useMotionValue(0);
    const rounded = useTransform(motionValue, (latest) => {
        return Math.round(latest);
    });

    useEffect(() => {
        if (isInView) {
            const num = parseInt(value.replace(/\D/g, ''));
            const controls = animate(motionValue, num, { duration });
            return controls.stop;
        }
    }, [isInView, motionValue, value, duration]);

    return (
        <motion.span ref={ref}>
            {isInView ? (
                <>
                    <motion.span>{rounded}</motion.span>
                    {value.includes('+') && '+'}
                    {value.includes('%') && '%'}
                    {value.includes('k') && 'k'}
                </>
            ) : (
                '0'
            )}
        </motion.span>
    );
}

export default function Stats({ data }: { data: any }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.5, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                type: 'spring',
                bounce: 0.4,
            },
        },
    };

    return (
        <section ref={ref} className="w-full bg-primary py-20 px-6 relative overflow-hidden">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/5 rounded-full blur-3xl"
            />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl font-bold text-charcoal text-center mb-12"
                >
                    {data.headline}
                </motion.h2>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {data.items.map((stat: any, idx: number) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, y: -10 }}
                            className="text-center relative group"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ delay: idx * 0.1, type: 'spring' }}
                                className="absolute inset-0 bg-white/10 rounded-2xl blur-xl group-hover:bg-white/20 transition-all"
                            />
                            <div className="relative z-10 p-6">
                                <motion.div
                                    className="text-4xl md:text-5xl font-black text-charcoal mb-2"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Counter value={stat.value} duration={2} />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: idx * 0.1 + 0.3 }}
                                    className="text-sm md:text-base text-charcoal/80 font-medium"
                                >
                                    {stat.label}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
