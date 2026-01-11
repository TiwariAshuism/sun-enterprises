'use client';

import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import privacyData from '@/data/privacy.json';

export default function PrivacyPage() {
    const [activeSection, setActiveSection] = useState('');
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax effect for header
    const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Floating animation for callout
    const floatingY = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -20]
    );

    useEffect(() => {
        const handleScroll = () => {
            const sections = privacyData.sidebar.links.map(link =>
                document.getElementById(link.href.substring(1))
            ).filter(Boolean);

            const current = sections.find(section => {
                const rect = section?.getBoundingClientRect();
                return rect && rect.top <= 150 && rect.bottom >= 150;
            });

            if (current) {
                setActiveSection(`#${current.id}`);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <main className="bg-background-light dark:bg-background-dark min-h-screen pt-20 relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.03, 0.05, 0.03]
                }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                    opacity: [0.02, 0.04, 0.02]
                }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] pointer-events-none"
            />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-yellow-400 to-primary z-50 origin-[0%]"
                style={{ scaleX }}
            />

            {/* Scroll Progress Indicator */}
            <motion.div
                className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-40"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
            >
                {privacyData.sidebar.links.map((link, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.5 }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSection === link.href
                            ? 'bg-primary w-8'
                            : 'bg-gray-300 dark:bg-gray-700'
                            }`}
                        onClick={() => document.getElementById(link.href.substring(1))?.scrollIntoView({ behavior: 'smooth' })}
                    />
                ))}
            </motion.div>

            <div className="max-w-[1200px] mx-auto px-6 lg:px-20 py-12 lg:py-24 relative z-10">
                {/* Breadcrumbs */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-8 items-center"
                >
                    {privacyData.header.breadcrumbs.map((crumb, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <Link
                                href={crumb.href}
                                className="text-muted-gold text-sm font-medium hover:text-primary transition-colors relative group"
                            >
                                {crumb.label}
                                <motion.span
                                    className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                                />
                            </Link>
                            {idx < privacyData.header.breadcrumbs.length - 1 && (
                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-muted-gold text-sm font-medium"
                                >
                                    /
                                </motion.span>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Page Heading */}
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="mb-16"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-charcoal dark:text-white text-5xl lg:text-7xl font-display font-black leading-tight tracking-[-0.04em] mb-6"
                    >
                        {privacyData.header.title.split(' ').map((word, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="inline-block mr-4"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-muted-gold text-lg font-normal flex items-center gap-2"
                    >
                        <motion.span
                            animate={{ rotate: [0, 360] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="material-symbols-outlined text-primary"
                        >
                            schedule
                        </motion.span>
                        Last Updated: {privacyData.header.lastUpdated}
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-1/4 lg:sticky lg:top-32 h-fit space-y-8 hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                        >
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-charcoal dark:text-white text-xs font-bold uppercase tracking-widest mb-4"
                            >
                                {privacyData.sidebar.title}
                            </motion.h3>
                            <div className="flex flex-col gap-1">
                                {privacyData.sidebar.links.map((link, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + idx * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative overflow-hidden ${activeSection === link.href
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-[#f4f4e7] dark:hover:bg-white/5 text-muted-gold dark:text-gray-400 hover:text-charcoal dark:hover:text-white'
                                                }`}
                                        >
                                            <motion.span
                                                animate={activeSection === link.href ? { rotate: [0, 360] } : {}}
                                                transition={{ duration: 0.6 }}
                                                className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors z-10"
                                            >
                                                {link.icon}
                                            </motion.span>
                                            <span className="font-medium text-sm z-10">{link.label}</span>
                                            {activeSection === link.href && (
                                                <motion.div
                                                    layoutId="activeSection"
                                                    className="absolute inset-0 bg-primary/5 rounded-lg"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Callout Box */}
                        <motion.div
                            style={{ y: floatingY }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, type: 'spring' }}
                            whileHover={{ scale: 1.02, rotate: 1 }}
                            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6 rounded-xl relative overflow-hidden group cursor-pointer"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.1, 0.2, 0.1]
                                }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -top-10 -right-10 w-32 h-32 bg-primary rounded-full blur-2xl"
                            />
                            <motion.p
                                className="text-sm font-bold text-charcoal dark:text-white mb-2 flex items-center gap-2 relative z-10"
                                whileHover={{ x: 5 }}
                            >
                                <motion.span
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="material-symbols-outlined text-primary"
                                >
                                    {privacyData.sidebar.callout.icon}
                                </motion.span>
                                {privacyData.sidebar.callout.title}
                            </motion.p>
                            <p className="text-sm text-charcoal/80 dark:text-gray-300 leading-relaxed relative z-10">
                                {privacyData.sidebar.callout.text}
                            </p>
                        </motion.div>
                    </aside>

                    {/* Main Content Area */}
                    <motion.article
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:w-3/4 max-w-2xl space-y-16"
                    >
                        {/* Our Commitment Section */}
                        <SectionWithAnimation
                            variants={itemVariants}
                            section={privacyData.sections.commitment}
                        />

                        {/* Your Data Section */}
                        <DataSection
                            variants={itemVariants}
                            section={privacyData.sections.yourData}
                        />

                        {/* How We Use Info Section */}
                        <CardsSection
                            variants={itemVariants}
                            section={privacyData.sections.howWeUse}
                        />

                        {/* Data Security Section */}
                        <SecuritySection
                            variants={itemVariants}
                            section={privacyData.sections.security}
                        />

                        {/* Rights Section */}
                        <RightsSection
                            variants={itemVariants}
                            section={privacyData.sections.rights}
                        />

                        {/* Contact Section */}
                        <ContactSection
                            variants={itemVariants}
                            contact={privacyData.contact}
                        />
                    </motion.article>
                </div>
            </div>
        </main>
    );
}

// Component for text sections
function SectionWithAnimation({ variants, section }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.section
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
            id={section.id}
        >
            <motion.h2
                whileHover={{ x: 10 }}
                className="text-3xl font-bold tracking-tight font-display text-charcoal dark:text-white relative inline-block"
            >
                {section.title}
                <motion.span
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : {}}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-yellow-400 rounded-full"
                />
            </motion.h2>
            {section.content.map((paragraph: string, idx: number) => (
                <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + idx * 0.2 }}
                    className="text-lg text-charcoal/80 dark:text-gray-300 leading-relaxed"
                >
                    {paragraph}
                </motion.p>
            ))}
        </motion.section>
    );
}

// Component for data list section
function DataSection({ variants, section }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.section
            ref={ref}
            variants={variants}
            className="space-y-6"
            id={section.id}
        >
            <motion.h2
                whileHover={{ x: 10 }}
                className="text-3xl font-bold tracking-tight font-display text-charcoal dark:text-white"
            >
                {section.title}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                className="text-lg text-charcoal/80 dark:text-gray-300 leading-relaxed"
            >
                {section.description}
            </motion.p>
            <ul className="space-y-4">
                {section.items.map((item: any, idx: number) => (
                    <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: idx * 0.15 }}
                        whileHover={{ x: 10, scale: 1.02 }}
                        className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all cursor-pointer group"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                            className="mt-1 text-primary"
                        >
                            <span className="material-symbols-outlined">check_circle</span>
                        </motion.div>
                        <div>
                            <h4 className="font-bold text-charcoal dark:text-white group-hover:text-primary transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-muted-gold dark:text-gray-400">{item.description}</p>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </motion.section>
    );
}

// Component for cards section
function CardsSection({ variants, section }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.section
            ref={ref}
            variants={variants}
            className="space-y-6"
            id={section.id}
        >
            <motion.h2
                whileHover={{ x: 10 }}
                className="text-3xl font-bold tracking-tight font-display text-charcoal dark:text-white"
            >
                {section.title}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                className="text-lg text-charcoal/80 dark:text-gray-300 leading-relaxed"
            >
                {section.description}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.cards.map((card: any, idx: number) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30, rotateX: -10 }}
                        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                        transition={{ delay: idx * 0.1, type: 'spring' }}
                        whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
                        className="p-6 bg-[#f4f4e7] dark:bg-white/5 rounded-xl border border-transparent hover:border-primary/20 transition-all hover:bg-white dark:hover:bg-white/10 group cursor-pointer relative overflow-hidden"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0, 0.1, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 3, delay: idx * 0.5 }}
                            className="absolute -top-10 -right-10 w-32 h-32 bg-primary rounded-full blur-3xl"
                        />
                        <motion.h4
                            whileHover={{ x: 5 }}
                            className="font-bold mb-2 group-hover:text-primary transition-colors relative z-10 text-charcoal dark:text-white"
                        >
                            {card.title}
                        </motion.h4>
                        <p className="text-sm text-muted-gold leading-relaxed dark:text-gray-400 relative z-10">
                            {card.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

// Component for security section with image
function SecuritySection({ variants, section }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.section
            ref={ref}
            variants={variants}
            className="space-y-6"
            id={section.id}
        >
            <motion.h2
                whileHover={{ x: 10 }}
                className="text-3xl font-bold tracking-tight font-display text-charcoal dark:text-white"
            >
                {section.title}
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-6 group"
            >
                <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        className="text-white text-lg md:text-xl font-medium italic max-w-2xl"
                    >
                        &quot;{section.image.quote}&quot;
                    </motion.p>
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                className="text-lg text-charcoal/80 dark:text-gray-300 leading-relaxed"
            >
                {section.content}
            </motion.p>
        </motion.section>
    );
}

// Component for rights section
function RightsSection({ variants, section }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.section
            ref={ref}
            variants={variants}
            className="space-y-6"
            id={section.id}
        >
            <motion.h2
                whileHover={{ x: 10 }}
                className="text-3xl font-bold tracking-tight font-display text-charcoal dark:text-white"
            >
                {section.title}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                className="text-lg text-charcoal/80 dark:text-gray-300 leading-relaxed"
            >
                {section.description}
            </motion.p>
            <div className="flex flex-wrap gap-4">
                {section.buttons.map((btnText: string, idx: number) => (
                    <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05, backgroundColor: "var(--primary)" }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: idx * 0.1 }}
                        className="px-6 py-3 rounded-full border border-primary/30 text-charcoal dark:text-white font-medium hover:text-charcoal hover:border-transparent transition-colors bg-white/5"
                    >
                        {btnText}
                    </motion.button>
                ))}
            </div>
        </motion.section>
    );
}


// Component for contact section
function ContactSection({ variants, contact }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.section
            ref={ref}
            variants={variants}
            className="pt-12 border-t border-[#f4f4e7] dark:border-white/10 mt-20"
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h4 className="font-bold text-charcoal dark:text-white text-xl mb-1">{contact.title}</h4>
                    <p className="text-sm text-muted-gold dark:text-gray-400">{contact.subtitle}</p>
                </div>
                <Link href={contact.button.href}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-primary text-charcoal font-bold py-3 px-6 rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all"
                    >
                        <span className="material-symbols-outlined">{contact.button.icon}</span>
                        {contact.button.text}
                    </motion.button>
                </Link>
            </div>
        </motion.section>
    );
}
