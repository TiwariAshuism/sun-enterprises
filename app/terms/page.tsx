'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import termsData from '@/data/terms.json';

export default function TermsPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <main className="bg-background-light dark:bg-background-dark min-h-screen pt-20">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-[0%]"
                style={{ scaleX }}
            />

            <div className="max-w-[1200px] mx-auto px-6 lg:px-20 py-12 lg:py-24">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-16"
                >
                    <h1 className="text-charcoal dark:text-white text-5xl lg:text-7xl font-display font-black leading-tight tracking-[-0.04em] mb-6">
                        {termsData.header.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-gold text-lg font-normal mb-6">
                        <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                        <span>Last Updated: {termsData.header.lastUpdated}</span>
                    </div>
                    <p className="text-lg text-charcoal/80 dark:text-gray-300 leading-relaxed max-w-3xl">
                        {termsData.header.intro}
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-1/4 lg:sticky lg:top-32 h-fit space-y-8 hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h3 className="text-charcoal dark:text-white text-xs font-bold uppercase tracking-widest mb-4">{termsData.sidebar.title}</h3>
                            <div className="flex flex-col gap-1">
                                {termsData.sidebar.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.href}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f4f4e7] dark:hover:bg-white/5 text-muted-gold dark:text-gray-400 font-medium text-sm transition-all hover:text-charcoal dark:hover:text-white group"
                                    >
                                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">{link.icon}</span>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact Callout */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-6 rounded-xl"
                        >
                            <p className="text-xs text-muted-gold leading-relaxed">
                                {termsData.sidebar.contact.text} <a href={`mailto:${termsData.sidebar.contact.email}`} className="text-primary font-bold hover:underline">{termsData.sidebar.contact.email}</a>
                            </p>
                        </motion.div>
                    </aside>

                    {/* Main Content Area */}
                    <motion.article
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:w-3/4 max-w-3xl space-y-16"
                    >
                        {termsData.sections.map((section, idx) => (
                            <motion.section
                                key={idx}
                                variants={itemVariants}
                                className="space-y-4 scroll-mt-32"
                                id={section.id}
                            >
                                <h2 className="text-2xl font-bold text-charcoal dark:text-white flex items-center gap-3 font-display">
                                    <span className="text-primary">{section.number}</span>
                                    {section.title}
                                </h2>
                                <p className="text-lg text-charcoal/80 dark:text-gray-300 leading-relaxed">
                                    {section.content}
                                </p>
                            </motion.section>
                        ))}

                        {/* Contact Footer */}
                        <motion.section variants={itemVariants} className="pt-12 border-t border-[#f4f4e7] dark:border-white/10 mt-20">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h4 className="font-bold text-charcoal dark:text-white text-xl mb-1">{termsData.contact.title}</h4>
                                    <p className="text-sm text-muted-gold">{termsData.contact.subtitle}</p>
                                </div>
                                <div className="flex gap-4">
                                    {termsData.contact.buttons.map((btn, idx) => (
                                        <button
                                            key={idx}
                                            className={`
                                                font-bold py-3 px-6 rounded-xl transition-all
                                                ${btn.style === 'primary'
                                                    ? 'bg-primary text-charcoal hover:bg-primary/90 hover:shadow-lg'
                                                    : 'bg-primary/10 text-primary hover:bg-primary/20'}
                                            `}
                                        >
                                            {btn.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    </motion.article>
                </div>
            </div>
        </main>
    );
}
