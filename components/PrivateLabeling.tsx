'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface Step {
    number: string;
    title: string;
    description: string;
    icon?: string;
    image?: string;
}

interface PrivateLabelingData {
    headline: string;
    subheadline: string;
    description: string;
    steps: Step[];
}

export default function PrivateLabeling({ data }: { data: PrivateLabelingData }) {
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
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const stepVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section ref={ref} className="w-full bg-gradient-to-br from-gray-50 via-white to-yellow-50 dark:from-gray-900 dark:via-background-dark dark:to-gray-800 py-24 px-6">
            <div className="max-w-[1200px] mx-auto">
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="text-center mb-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4"
                    >
                        <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                            {data.headline}
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-6"
                    >
                        {data.subheadline}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-charcoal-muted dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        {data.description}
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {data.steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            variants={stepVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* Decorative gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Step number badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ delay: idx * 0.15 + 0.3, type: 'spring' }}
                                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                            >
                                <span className="text-primary font-bold text-lg">{step.number}</span>
                            </motion.div>

                            <div className="relative z-10">
                                {/* Icon or Image */}
                                {step.icon && (
                                    <motion.div
                                        initial={{ rotate: -10, opacity: 0 }}
                                        animate={isInView ? { rotate: 0, opacity: 1 } : {}}
                                        transition={{ delay: idx * 0.15 + 0.4 }}
                                        className="mb-6"
                                    >
                                        <span className="material-symbols-outlined text-5xl text-primary">
                                            {step.icon}
                                        </span>
                                    </motion.div>
                                )}

                                {step.image && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: idx * 0.15 + 0.4 }}
                                        className="relative h-48 mb-6 rounded-lg overflow-hidden"
                                    >
                                        <Image
                                            src={step.image}
                                            alt={step.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </motion.div>
                                )}

                                {/* Title */}
                                <motion.h3
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: idx * 0.15 + 0.5 }}
                                    className="text-2xl font-bold text-charcoal dark:text-white mb-3"
                                >
                                    {step.title}
                                </motion.h3>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: idx * 0.15 + 0.6 }}
                                    className="text-charcoal-muted dark:text-gray-400 leading-relaxed"
                                >
                                    {step.description}
                                </motion.p>
                            </div>

                            {/* Decorative corner element */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-charcoal font-bold px-8 py-4 rounded-full shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:scale-105"
                    >
                        Start Your Brand Journey
                        <span className="material-symbols-outlined text-[24px]">
                            arrow_forward
                        </span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
