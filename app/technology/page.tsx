'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import websiteData from '@/data/website.json';

export default function TechnologyPage() {
    const { hero, process, services, quality, cta } = websiteData.exportServices;

    const randomVideo = useMemo(() => {
        const videos = [
            '/video/Home-page-v01.mp4',
            '/video/Home-page-v02.mp4',
            '/video/Home-page-v03.mp4',
            '/video/Home-page-v04.mp4'
        ];
        return videos[Math.floor(Math.random() * videos.length)];
    }, []);

    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                            {hero.badge}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-charcoal dark:text-white mb-6 tracking-tight">
                            {hero.headline} <span className="text-primary">{hero.highlightedWord}</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            {hero.subheadline}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-4">
                            {process.headline}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {process.subheadline}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {process.steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-200 dark:border-gray-700"
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-xl text-charcoal">
                                    {index + 1}
                                </div>
                                <span className="material-symbols-outlined text-primary text-5xl mb-4">
                                    {step.icon}
                                </span>
                                <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Services */}
            <section className="py-20 px-6 bg-white dark:bg-gray-900">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-4">
                            {services.headline}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.items.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-background-light dark:bg-background-dark rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-all"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-primary text-4xl">
                                        {service.icon}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-4">
                                    {service.title}
                                </h3>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                                                check_circle
                                            </span>
                                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Assurance */}
            <section className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                                {quality.badge}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-6">
                                {quality.headline}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                                {quality.description}
                            </p>
                            <div className="space-y-4">
                                {quality.points.map((point, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-charcoal">
                                                {point.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-charcoal dark:text-white mb-1">
                                                {point.title}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400">{point.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700"
                        >
                            <video
                                key={randomVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            >
                                <source src={randomVideo} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-yellow-300/10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-primary to-yellow-400">
                <div className="container mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                            {cta.headline}
                        </h2>
                        <p className="text-xl text-charcoal/80 mb-10 max-w-2xl mx-auto">
                            {cta.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {cta.buttons.map((button, index) => (
                                <Link key={index} href={button.href}>
                                    <button className={`font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 ${button.type === 'primary'
                                        ? 'bg-charcoal hover:bg-charcoal/90 text-white inline-flex items-center gap-2'
                                        : 'bg-white hover:bg-gray-100 text-charcoal'
                                        }`}>
                                        {button.text}
                                        {button.type === 'primary' && (
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        )}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
