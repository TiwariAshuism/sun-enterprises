'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Testimonials({ data }: { data: any }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
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

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section ref={ref} className="w-full bg-white dark:bg-gray-900 py-24 px-6">
            <div className="max-w-[1200px] mx-auto">
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="text-center mb-16"
                >
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-4"
                    >
                        {data.headline}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-charcoal-muted dark:text-gray-400"
                    >
                        {data.subheadline}
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {data.items.map((testimonial: any, idx: number) => (
                        <motion.div
                            key={idx}
                            variants={cardVariants}
                            whileHover={{ y: -10, scale: 1.03 }}
                            className="p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.1 }}
                                transition={{ delay: idx * 0.2 }}
                                className="absolute -top-10 -right-10 text-[200px] text-primary"
                            >
                                &quot;
                            </motion.div>
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="relative w-12 h-12 rounded-full ring-2 ring-primary/20 overflow-hidden bg-gray-200 dark:bg-gray-800"
                                >
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.author}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <div>
                                    <h4 className="font-bold text-charcoal dark:text-white">{testimonial.author}</h4>
                                    <p className="text-sm text-charcoal-muted dark:text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: idx * 0.2 + 0.3 }}
                                className="text-charcoal-muted dark:text-gray-300 leading-relaxed italic relative z-10"
                            >
                                &quot;{testimonial.quote}&quot;
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
