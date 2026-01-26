'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import pagesData from '@/data/pages.json';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
    const data = pagesData.about;
    const ref = useRef(null);
    const storyRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const isStoryInView = useInView(storyRef, { once: true, margin: '-100px' });
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <main className="pt-16 bg-background-light dark:bg-background-dark overflow-hidden">
            {/* Hero Section - Enhanced */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background-light dark:to-background-dark z-10" />
                    <motion.div
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={data.hero.backgroundImage}
                            alt="Golden wheat field"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </motion.div>

                {/* Animated Grain Pattern */}
                <motion.div
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                    className="absolute inset-0 z-[5] opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                />

                {/* Content */}
                <motion.div
                    style={{ opacity }}
                    className="relative z-20 text-center px-6 max-w-5xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                        className="inline-block mb-6 px-6 py-3 bg-primary/90 backdrop-blur-sm rounded-full"
                    >
                        <span className="text-charcoal font-bold text-sm md:text-base uppercase tracking-wider">
                            Three Generations of Excellence
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                        className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white drop-shadow-2xl"
                    >
                        {data.hero.title.split(' ').map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                                className="inline-block mr-4 md:mr-6"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-lg md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-2xl"
                    >
                        {data.hero.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-12 flex flex-wrap gap-4 justify-center"
                    >
                        <Link href="/products">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-primary text-charcoal font-bold rounded-full shadow-2xl hover:shadow-primary/50 transition-all"
                            >
                                View Products
                            </motion.button>
                        </Link>
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all"
                            >
                                Contact Us
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="flex flex-col items-center gap-2 text-white/70">
                        <span className="text-sm uppercase tracking-wider font-semibold">Scroll</span>
                        <span className="material-symbols-outlined text-4xl">expand_more</span>
                    </div>
                </motion.div>
            </section>

            {/* Mission Statement - Redesigned */}
            <section ref={storyRef} className="pt-40 pb-32 px-6 relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm uppercase tracking-wider mb-6"
                            >
                                {data.mission.title}
                            </motion.span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-charcoal dark:text-white leading-tight">
                                {data.mission.title.split(' ').map((word: string, i: number) => (
                                    <span key={i} className={i === 0 ? 'block text-primary' : ''}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h2>

                            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                    {data.mission.description}
                                </p>

                                {/* Three Generations */}
                                <div className="space-y-6 mb-8">
                                    {data.generations.map((gen: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.15 }}
                                            className="border-l-4 border-primary pl-6 py-2"
                                        >
                                            <h4 className="text-xl font-bold text-charcoal dark:text-white mb-2">
                                                {gen.title}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {gen.description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed italic border-t border-gray-200 dark:border-gray-700 pt-6">
                                    {data.legacyNote}
                                </p>
                            </div>

                            {/* Key Highlights */}
                            <div className="mt-8 grid grid-cols-2 gap-6">
                                {[
                                    { icon: 'verified', label: 'Quality First' },
                                    { icon: 'public', label: 'Global Export' },
                                    { icon: 'award_star', label: 'ISO Certified' },
                                    { icon: 'handshake', label: 'Trusted Partner' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 p-4 bg-card-light dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                                    >
                                        <span className="material-symbols-outlined text-primary text-3xl">
                                            {item.icon}
                                        </span>
                                        <span className="font-semibold text-charcoal dark:text-white">
                                            {item.label}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Image Grid - Disabled */}
                        {/* <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[600px]"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="absolute top-0 right-0 w-[70%] h-[55%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
                            >
                                <Image
                                    src="/images/about-story.jpg"
                                    alt="Our story"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="absolute bottom-0 left-0 w-[65%] h-[50%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
                            >
                                <Image
                                    src="/images/about-mission.jpg"
                                    alt="Our mission"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-charcoal p-8 rounded-full shadow-2xl z-10"
                            >
                                <div className="text-center">
                                    <span className="material-symbols-outlined text-5xl mb-2">family_star</span>
                                    <p className="text-xs font-bold uppercase">Team Members</p>
                                </div>
                            </motion.div>
                        </motion.div> */}
                    </div>
                </div>
            </section>

            {/* Timeline - Enhanced */}
            <section className="bg-gradient-to-b from-background-light via-card-light to-background-light dark:from-background-dark dark:via-gray-900 dark:to-background-dark py-32 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #FFD700 35px, #FFD700 36px)',
                    }} />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm uppercase tracking-wider mb-4"
                        >
                            Our Journey
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-white">
                            Our Journey of Growth
                        </h2>
                    </motion.div>

                    {/* Timeline Items */}
                    <div className="relative">
                        {/* Center Line */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary -translate-x-1/2" />

                        <div className="space-y-16">
                            {data.timeline.map((item: any, idx: number) => (
                                <TimelineItemEnhanced key={idx} item={item} index={idx} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitment to Quality */}
            <section className="py-32 px-6 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm uppercase tracking-wider mb-4">
                            Our Commitment
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-6">
                            {data.commitment.title}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            {data.commitment.description}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {data.commitment.items.map((item: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="p-8 bg-card-light dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
                            >
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-primary text-3xl">
                                        {item.icon}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center p-8 bg-primary/5 rounded-2xl border-2 border-primary/20"
                    >
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {data.commitment.approach}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Global Expansion */}
            <section className="py-32 px-6 bg-gradient-to-b from-card-light to-background-light dark:from-gray-900 dark:to-background-dark">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm uppercase tracking-wider mb-4">
                            Global Reach
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-8">
                            {data.globalExpansion.title}
                        </h2>
                    </motion.div>

                    <div className="space-y-6">
                        {data.globalExpansion.paragraphs.map((para: string, idx: number) => (
                            <motion.p
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed text-center"
                            >
                                {para}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sustainability */}
            <section className="py-32 px-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-2 bg-green-600/10 rounded-full text-green-600 dark:text-green-400 font-bold text-sm uppercase tracking-wider mb-4">
                            Sustainability
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-6">
                            {data.sustainability.title}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
                            {data.sustainability.description}
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                            {data.sustainability.subtitle}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {data.sustainability.items.map((item: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                whileHover={{ scale: 1.05 }}
                                className="p-8 bg-white dark:bg-gray-800 rounded-2xl border-2 border-green-200 dark:border-green-900 hover:shadow-xl transition-all text-center"
                            >
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl">
                                        {item.icon}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center p-8 bg-green-600/10 rounded-2xl border-2 border-green-600/20"
                    >
                        <p className="text-xl text-green-800 dark:text-green-200 font-semibold italic">
                            {data.sustainability.tagline}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-32 px-6 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-6">
                            {data.whyChoose.title}
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.whyChoose.reasons.map((reason: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="p-6 bg-card-light dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-primary text-2xl">
                                        {reason.icon}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">
                                    {reason.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {reason.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className="py-32 px-6 bg-gradient-to-br from-primary/10 via-background-light to-primary/5 dark:from-primary/5 dark:via-background-dark dark:to-primary/10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-8">
                            <span className="material-symbols-outlined text-charcoal text-4xl">
                                visibility
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-8">
                            {data.vision.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                            {data.vision.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Impact Stats - Enhanced */}
            <section className="bg-gradient-to-br from-charcoal via-gray-900 to-charcoal dark:from-zinc-950 dark:via-black dark:to-zinc-950 text-white py-32 px-6 overflow-hidden relative">
                {/* Animated Background Elements */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5"
                >
                    <span className="material-symbols-outlined text-[800px] leading-none text-primary">
                        sunny
                    </span>
                </motion.div>

                <div className="absolute inset-0 bg-grid-pattern opacity-5" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Numbers That Tell Our Story
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Decades of dedication, thousands of satisfied clients
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.impact.stats.map((stat: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: idx * 0.15,
                                    type: 'spring',
                                    stiffness: 100
                                }}
                                whileHover={{ scale: 1.1, y: -10 }}
                                className="relative group"
                            >
                                {/* Card Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="relative p-8 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15 + 0.3, type: 'spring' }}
                                        className="mb-4"
                                    >
                                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                            <span className="material-symbols-outlined text-primary text-3xl">
                                                {idx === 0 ? 'calendar_today' : idx === 1 ? 'family_star' : idx === 2 ? 'verified' : 'workspace_premium'}
                                            </span>
                                        </div>
                                    </motion.div>
                                    <motion.p
                                        className="text-5xl md:text-6xl font-black text-primary mb-3 font-mono"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15 + 0.5 }}
                                    >
                                        {stat.value}
                                    </motion.p>
                                    <p className="text-gray-300 text-sm uppercase tracking-widest font-bold">
                                        {stat.label}
                                    </p>
                                </div>

                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA - Enhanced */}
            <section className="py-32 px-6 bg-gradient-to-b from-background-light to-card-light dark:from-background-dark dark:to-gray-900 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    {/* Icon Badge */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', duration: 1 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-8 shadow-lg"
                    >
                        <span className="material-symbols-outlined text-4xl text-charcoal">
                            handshake
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-charcoal dark:text-white"
                    >
                        {data.cta.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-gray-600 dark:text-gray-400 mb-12 font-light max-w-2xl mx-auto"
                    >
                        {data.cta.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        {data.cta.buttons.map((button: any, idx: number) => (
                            <Link key={idx} href={button.type === 'primary' ? '/contact' : '/products'}>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-10 py-5 rounded-full font-bold text-lg transition-all shadow-lg ${button.type === 'primary'
                                        ? 'bg-primary text-charcoal hover:shadow-2xl hover:shadow-primary/30'
                                        : 'bg-transparent border-2 border-gray-300 dark:border-gray-700 text-charcoal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {button.text}
                                </motion.button>
                            </Link>
                        ))}
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400"
                    >
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">verified</span>
                            <span>APEDA Registered</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">workspace_premium</span>
                            <span>ISO Certified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">public</span>
                            <span>Global Export</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </main >
    );
}

// Enhanced Timeline Item Component
function TimelineItemEnhanced({ item, index }: { item: any; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`relative flex flex-col lg:flex-row gap-8 ${isEven ? 'lg:flex-row-reverse' : ''
                }`}
        >
            {/* Content */}
            <div className={`flex-1 ${isEven ? 'lg:text-right' : ''}`}>
                <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-card-light dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.2, type: 'spring' }}
                        className="inline-block px-4 py-2 bg-primary/10 text-primary font-black text-2xl rounded-full mb-4"
                    >
                        {item.year}
                    </motion.span>
                    <h3 className="text-2xl font-bold mb-3 text-charcoal dark:text-white">
                        {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                    </p>
                </motion.div>
            </div>

            {/* Center Dot */}
            <div className="hidden lg:flex flex-col items-center flex-shrink-0">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, type: 'spring' }}
                    whileHover={{ scale: 1.5 }}
                    className="w-6 h-6 rounded-full bg-primary border-4 border-background-light dark:border-background-dark shadow-lg z-20"
                />
            </div>

            {/* Spacer */}
            <div className="flex-1 hidden lg:block" />
        </motion.div>
    );
}
