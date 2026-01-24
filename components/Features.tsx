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
        <section ref={ref} className="w-full bg-background-light dark:bg-gray-900 py-24 px-6">
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
                        className="group p-8 rounded-2xl bg-card-light dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:border-primary transition-all duration-300 cursor-pointer"
                    >
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="size-14 rounded-xl bg-primary flex items-center justify-center text-charcoal mb-6 shadow-md"
                        >
                            <span className="material-symbols-outlined text-3xl font-bold">{feature.icon}</span>
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl font-bold text-charcoal dark:text-white mb-4"
                        >
                            {feature.title}
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-600 dark:text-gray-300 leading-relaxed text-base"
                        >
                            {feature.description}
                        </motion.p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
