'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import pagesData from '@/data/pages.json';

export default function TechnologyPage() {
    const data = pagesData.technology;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1.1] text-charcoal dark:text-white mb-8"
                    >
                        {data.hero.title.split('Behind').map((part, idx) => (
                            <span key={idx}>
                                {part}
                                {idx === 0 && <br className="hidden md:block" />}
                                {idx === 0 && 'Behind'}
                            </span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-2xl text-xl text-charcoal/60 dark:text-white/60 mb-12"
                    >
                        {data.hero.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.05, rotateY: 5 }}
                                className="w-1/2 h-4/5 bg-cover bg-center"
                                style={{ backgroundImage: `url('${data.hero.productImage}')` }}
                            />
                        </div>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                            {data.hero.badges.map((badge: string, idx: number) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + idx * 0.1 }}
                                    className="px-3 py-1 bg-white/80 dark:bg-black/80 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20"
                                >
                                    {badge}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid */}
            <BentoGrid data={data.intelligence} />

            {/* Solar Yield */}
            <SolarYield data={data.solarYield} />

            {/* Specs */}
            <TechSpecs data={data.specs} />
        </div>
    );
}

function BentoGrid({ data }: { data: any }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 px-6 bg-white dark:bg-[#151517]">
            <div className="max-w-[1200px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="mb-20 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-charcoal dark:text-white mb-6">
                        {data.title}
                    </h2>
                    <p className="text-lg text-charcoal/60 dark:text-white/60 max-w-xl">
                        {data.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
                    {/* Main Feature */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.01 }}
                        className="md:col-span-2 md:row-span-2 rounded-xl bg-background-light dark:bg-background-dark p-8 border border-gray-100 dark:border-gray-800 flex flex-col justify-between overflow-hidden relative cursor-pointer"
                    >
                        <div>
                            <span className="material-symbols-outlined text-primary text-4xl mb-4">
                                {data.features.main.icon}
                            </span>
                            <h3 className="text-2xl font-bold mb-2 text-charcoal dark:text-white">
                                {data.features.main.title}
                            </h3>
                            <p className="text-charcoal/60 dark:text-white/60">{data.features.main.description}</p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5 }}
                            className="mt-8 h-full bg-cover bg-center rounded-lg"
                            style={{ backgroundImage: `url('${data.features.main.image}')` }}
                        />
                    </motion.div>

                    {/* Secondary Feature */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.01 }}
                        className="md:col-span-2 md:row-span-1 rounded-xl bg-background-light dark:bg-background-dark p-8 border border-gray-100 dark:border-gray-800 flex items-center gap-6 cursor-pointer"
                    >
                        <div className="flex-1">
                            <span className="material-symbols-outlined text-primary text-4xl mb-4">
                                {data.features.secondary.icon}
                            </span>
                            <h3 className="text-2xl font-bold mb-2 text-charcoal dark:text-white">
                                {data.features.secondary.title}
                            </h3>
                            <p className="text-charcoal/60 dark:text-white/60">{data.features.secondary.description}</p>
                        </div>
                        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg shrink-0 overflow-hidden">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url('${data.features.secondary.image}')` }}
                            />
                        </div>
                    </motion.div>

                    {/* Small Features */}
                    {data.features.small.map((feature: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className={`md:col-span-1 md:row-span-1 rounded-xl p-8 border flex flex-col justify-center text-center cursor-pointer ${feature.highlighted
                                ? 'bg-primary/10 border-primary/20'
                                : 'bg-background-light dark:bg-background-dark border-gray-100 dark:border-gray-800'
                                }`}
                        >
                            {feature.icon ? (
                                <span className="material-symbols-outlined text-primary text-5xl mb-2">
                                    {feature.icon}
                                </span>
                            ) : (
                                <span className="text-5xl font-bold text-primary mb-2">{feature.title}</span>
                            )}
                            <p className="text-sm font-bold uppercase tracking-widest text-charcoal/40 dark:text-white/40">
                                {feature.subtitle}
                            </p>
                            <p className="mt-4 text-xs font-bold text-charcoal dark:text-white">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SolarYield({ data }: { data: any }) {
    return (
        <section className="py-32 px-6">
            <div className="max-w-[1200px] mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.05 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-9xl font-bold tracking-tight text-charcoal/10 dark:text-white/5 select-none leading-none"
                >
                    {data.backgroundText}
                </motion.h2>

                <div className="-mt-8 md:-mt-16 relative z-10">
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-bold text-charcoal dark:text-white tracking-tight"
                    >
                        {data.title}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-xl text-charcoal/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed"
                    >
                        {data.description.split('SunTrack™').map((part: string, idx: number) => (
                            <span key={idx}>
                                {part}
                                {idx === 0 && <span className="text-charcoal dark:text-white font-semibold">SunTrack™</span>}
                            </span>
                        ))}
                    </motion.p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                    {data.features.map((feature: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="border-t border-gray-200 dark:border-gray-800 pt-6"
                        >
                            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                                {feature.category}
                            </p>
                            <h4 className="text-xl font-bold mb-4 text-charcoal dark:text-white">{feature.title}</h4>
                            <p className="text-charcoal/60 dark:text-white/60 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TechSpecs({ data }: { data: any }) {
    return (
        <section className="py-24 px-6 bg-[#f2f2f2] dark:bg-[#101010]">
            <div className="max-w-[960px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-16 text-center text-charcoal dark:text-white"
                >
                    {data.title}
                </motion.h2>

                <div className="space-y-0 border-t border-gray-300 dark:border-gray-800">
                    {data.items.map((item: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-3 py-6 border-b border-gray-300 dark:border-gray-800"
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-charcoal/40 dark:text-white/40 mb-2 md:mb-0">
                                {item.label}
                            </span>
                            <div className="md:col-span-2">
                                <p className="text-charcoal dark:text-white font-medium">{item.value}</p>
                                <p className="text-sm text-charcoal/50 dark:text-white/50 mt-1">{item.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 flex flex-col items-center gap-6"
                >
                    <p className="text-charcoal/40 dark:text-white/40 text-sm">{data.cta.text}</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-charcoal text-white dark:bg-white dark:text-charcoal px-8 py-3 rounded-full font-bold"
                    >
                        {data.cta.buttonText}
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
