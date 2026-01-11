'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Features({ data }: { data: any[] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        },
    };

    return (
        <section ref={ref} className="w-full bg-background-light dark:bg-background-dark py-24 px-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
            >
                {data.map((feature: any, idx: number) => (
                    <motion.div
                        key={idx}
                        variants={cardVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="group p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-charcoal transition-colors duration-300"
                        >
                            <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl font-bold text-charcoal dark:text-white mb-3"
                        >
                            {feature.title}
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-charcoal-muted dark:text-gray-400 leading-relaxed"
                        >
                            {feature.description}
                        </motion.p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
