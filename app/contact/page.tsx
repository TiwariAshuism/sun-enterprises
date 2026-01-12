'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import pagesData from '@/data/pages.json';

export default function ContactPage() {
    const data = pagesData.contact;
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
            <main className="flex-1 flex justify-center items-center pt-28 pb-12 lg:pt-32 lg:pb-20 px-6 md:px-10 lg:px-40">
                <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="max-w-md">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-5xl lg:text-7xl font-extralight leading-[1.1] tracking-tight text-charcoal dark:text-white mb-8"
                            >
                                {data.hero.headline}{' '}
                                <span className="font-bold italic">{data.hero.highlightedWord}</span>.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg text-sage dark:text-gray-400 font-light mb-12 leading-relaxed"
                            >
                                {data.hero.subheadline}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-6 border-t border-gray-300 dark:border-gray-700 pt-10"
                            >
                                {data.contactDetails.map((detail: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + idx * 0.1 }}
                                        className="grid grid-cols-[100px_1fr] gap-4"
                                    >
                                        <span className="text-xs uppercase tracking-widest text-sage dark:text-gray-500 font-bold">
                                            {detail.label}
                                        </span>
                                        {detail.value ? (
                                            <span className="text-base font-medium">{detail.value}</span>
                                        ) : (
                                            <div className="flex gap-4">
                                                {detail.links.map((link: any, linkIdx: number) => (
                                                    <motion.a
                                                        key={linkIdx}
                                                        href={link.href}
                                                        whileHover={{ scale: 1.05 }}
                                                        className="text-primary hover:underline text-sm font-bold"
                                                    >
                                                        {link.text}
                                                    </motion.a>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-white dark:bg-gray-900 rounded-xl p-8 lg:p-12 shadow-sm border border-gray-200 dark:border-gray-800"
                    >
                        <h2 className="text-2xl font-bold mb-8 dark:text-white">{data.form.title}</h2>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            {data.form.fields.map((field: any, idx: number) => (
                                <motion.div
                                    key={field.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + idx * 0.1 }}
                                    className="flex flex-col gap-2"
                                >
                                    <label className="text-sm font-semibold text-charcoal dark:text-gray-300">
                                        {field.label}
                                    </label>
                                    {field.type === 'select' ? (
                                        <motion.select
                                            whileFocus={{ scale: 1.01 }}
                                            className="flex w-full rounded-lg text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-transparent h-14 px-4 text-base transition-all"
                                        >
                                            {field.options.map((option: string) => (
                                                <option key={option}>{option}</option>
                                            ))}
                                        </motion.select>
                                    ) : field.type === 'textarea' ? (
                                        <motion.textarea
                                            whileFocus={{ scale: 1.01 }}
                                            className="flex w-full rounded-lg text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-transparent placeholder:text-gray-400 p-4 text-base resize-none transition-all"
                                            placeholder={field.placeholder}
                                            rows={field.rows}
                                        />
                                    ) : (
                                        <motion.input
                                            whileFocus={{ scale: 1.01 }}
                                            className="flex w-full rounded-lg text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-transparent h-14 placeholder:text-gray-400 px-4 text-base transition-all"
                                            type={field.type}
                                            placeholder={field.placeholder}
                                        />
                                    )}
                                </motion.div>
                            ))}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full flex items-center justify-center rounded-lg h-14 px-6 bg-primary text-charcoal text-base font-bold shadow-md shadow-primary/20 transition-all"
                            >
                                {data.form.submitText}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </main>

            {/* Background Accent */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="fixed bottom-0 right-0 -z-10 pointer-events-none w-1/3 aspect-square bg-cover"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBtZyMQelSKBKu0pFxyTjTx1ZJHbuD8ky8of7oXr6DTwRY5MXUAbit5WHqJR6n7Xt_E5DMkMq__FRohnt9sqxWY8sFgBH44dHLISb2VqaEfV45e0HTK7tG2-9WqgdoQt80I4Ovqi9R9tV4aiOuhflcbKhe9T8CoyyIk3xgEzd37FR9WTifwrHxYI0RbWoPR0muf-ltenuXfZdEHo5N6-oclq9jrqTiSfSt2GNwtJ2uTrpyIo9m40rL-Zaekq_9rsUXlRo6aA9nbg')",
                }}
            />

            {/* Theme Toggle */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, type: 'spring' }}
                className="fixed bottom-6 right-6 z-50"
            >
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    className="size-12 rounded-full bg-charcoal dark:bg-white text-white dark:text-charcoal flex items-center justify-center shadow-lg transition-colors"
                    onClick={() => document.documentElement.classList.toggle('dark')}
                >
                    <span className="material-symbols-outlined">contrast</span>
                </motion.button>
            </motion.div>
        </div>
    );
}
