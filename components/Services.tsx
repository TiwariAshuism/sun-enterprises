'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Services({ data }: { data: any }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
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

    return (
        <section id="solutions" ref={ref} className="w-full bg-background-light dark:bg-background-dark py-24 px-6">
            <motion.div
                variants={headerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="max-w-[960px] mx-auto flex flex-col items-center text-center mb-20"
            >
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
                >
                    <span className="material-symbols-outlined text-primary text-sm">{data.badge.icon}</span>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {data.badge.text}
                    </span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary dark:text-white mb-6">
                    {data.headline}
                </h2>
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 64 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-1 bg-primary rounded-full mb-6"
                />
                <p className="text-lg md:text-xl text-text-secondary dark:text-gray-400 max-w-2xl font-light leading-relaxed">
                    {data.subheadline}
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
                {data.items.map((service: any, idx: number) => (
                    <ServiceCard key={idx} service={service} index={idx} />
                ))}
                <CTACard data={data.callToAction} />
            </motion.div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -15 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="card-hover-effect group relative flex flex-col p-8 rounded-2xl bg-card-light dark:bg-card-dark shadow-soft hover:shadow-hover border border-transparent hover:border-primary/10 dark:border-white/5 dark:hover:border-primary/20 overflow-hidden h-full cursor-pointer"
        >
            <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left"
            />
            <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-background-light dark:bg-background-dark text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300"
            >
                <span className="material-symbols-outlined !text-3xl">{service.icon}</span>
            </motion.div>
            <h3 className="text-xl font-bold text-text-primary dark:text-white mb-3">{service.title}</h3>
            <p className="text-text-secondary dark:text-gray-400 leading-relaxed mb-8 flex-grow">
                {service.description}
            </p>
            <motion.div
                className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10 flex items-center text-sm font-semibold text-text-primary dark:text-white group-hover:text-primary transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
            >
                <span>{service.cta}</span>
                <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="material-symbols-outlined ml-2 !text-lg"
                >
                    arrow_forward
                </motion.span>
            </motion.div>
        </motion.div>
    );
}

function CTACard({ data }: { data: any }) {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="card-hover-effect group relative flex flex-col justify-center items-center p-8 rounded-2xl bg-primary shadow-soft hover:shadow-hover overflow-hidden h-full text-center cursor-pointer"
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 bg-black/5 dark:bg-black/20 z-0"
            />
            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white backdrop-blur-sm"
                >
                    <span className="material-symbols-outlined !text-4xl">{data.icon}</span>
                </motion.div>
                <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">{data.title}</h3>
                <p className="text-text-primary/80 dark:text-white/90 text-sm mb-6 max-w-[200px]">
                    {data.description}
                </p>
                <a href={data.href}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-text-primary text-white dark:bg-white dark:text-primary px-6 py-2 rounded-lg text-sm font-bold shadow-lg"
                    >
                        {data.buttonText}
                    </motion.button>
                </a>
            </div>
        </motion.div>
    );
}
