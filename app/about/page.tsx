'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import pagesData from '@/data/pages.json';

export default function AboutPage() {
    const data = pagesData.about;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);

    return (
        <main className="pt-16 bg-background-light dark:bg-background-dark">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-light dark:to-background-dark z-10" />
                    <motion.img
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full object-cover"
                        src={data.hero.backgroundImage}
                        alt="Golden hour sunlight over vast wheat field"
                    />
                </motion.div>

                <div className="relative z-20 text-center px-6 max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
                        className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.1] text-charcoal dark:text-white"
                    >
                        {data.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        {data.hero.subtitle}
                    </motion.p>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mt-12"
                    >
                        <span className="material-symbols-outlined text-4xl opacity-30">keyboard_double_arrow_down</span>
                    </motion.div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-32 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-charcoal dark:text-white">
                        {data.mission.title}
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-primary mx-auto mb-8"
                    />
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                        {data.mission.description}
                    </p>
                </motion.div>
            </section>

            {/* Timeline */}
            <section className="bg-background-light dark:bg-zinc-900/50 py-32">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-20 tracking-tight text-charcoal dark:text-white"
                    >
                        Our Journey
                    </motion.h2>
                    <div className="grid grid-cols-[40px_1fr] md:grid-cols-[1fr_40px_1fr] gap-x-8">
                        {data.timeline.map((item: any, idx: number) => (
                            <TimelineItem key={idx} item={item} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section ref={ref} className="py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                    >
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight text-charcoal dark:text-white">
                                {data.leadership.title}
                            </h2>
                            <p className="text-gray-500 mt-2 text-lg">{data.leadership.subtitle}</p>
                        </div>
                        <motion.button
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-charcoal dark:text-white font-semibold group"
                        >
                            {data.leadership.ctaText}{' '}
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </motion.button>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {data.leadership.team.map((member: any, idx: number) => (
                            <LeaderCard key={idx} member={member} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="bg-charcoal dark:bg-zinc-950 text-white py-24 px-6 overflow-hidden relative">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                    className="absolute top-0 right-0 p-20 opacity-10"
                >
                    <span className="material-symbols-outlined text-[300px] leading-none">sunny</span>
                </motion.div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {data.impact.stats.map((stat: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, type: 'spring' }}
                                whileHover={{ scale: 1.1, y: -10 }}
                            >
                                <p className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</p>
                                <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-charcoal dark:text-white">
                        {data.cta.title}
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 font-light">
                        {data.cta.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {data.cta.buttons.map((button: any, idx: number) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${button.type === 'primary'
                                    ? 'bg-primary text-charcoal hover:shadow-lg'
                                    : 'bg-transparent border-2 border-gray-200 dark:border-gray-800 text-charcoal dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-900'
                                    }`}
                            >
                                {button.text}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </section>
        </main>
    );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
    const isEven = index % 2 === 0;
    const isLast = index === 3;

    return (
        <>
            <div className="hidden md:flex flex-col items-end justify-center text-right py-10">
                {!isEven && <p className="text-primary font-bold text-2xl">{item.year}</p>}
            </div>

            <div className="flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', delay: index * 0.2 }}
                    className="w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-zinc-900 z-10 shadow-sm"
                />
                {!isLast && <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full grow" />}
            </div>

            <motion.div
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col py-10"
            >
                <p className="md:hidden text-primary font-bold">{item.year}</p>
                {isEven && (
                    <p className="hidden md:block text-primary font-bold text-2xl -ml-[calc(100%+80px)] text-right w-full absolute mt-2">
                        {item.year}
                    </p>
                )}
                <h3 className="text-xl font-bold mb-2 text-charcoal dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {item.description}
                </p>
            </motion.div>
        </>
    );
}

function LeaderCard({ member, index }: { member: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group"
        >
            <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-gray-100">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    src={member.image}
                    alt={member.name}
                />
            </div>
            <h3 className="text-xl font-bold text-charcoal dark:text-white">{member.name}</h3>
            <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed">
                {member.bio}
            </p>
        </motion.div>
    );
}
