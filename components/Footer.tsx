'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer({ data, site }: { data: any; site: any }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="w-full bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 py-12 px-6"
        >
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center md:items-start gap-4"
                >
                    <div className="flex items-center gap-2 text-charcoal dark:text-white">
                        <motion.span
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                            className="material-symbols-outlined"
                        >
                            {site.logo}
                        </motion.span>
                        <span className="font-bold text-lg">{site.name}</span>
                    </div>
                    <p className="text-sm text-charcoal-muted dark:text-gray-400 text-center md:text-left max-w-xs">
                        {data.description}
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex gap-8 text-sm font-medium text-charcoal-muted dark:text-gray-400"
                >
                    {data.links.map((link: any, idx: number) => (
                        <motion.div key={idx} whileHover={{ y: -2 }}>
                            <Link href={link.href} className="hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-4">
                    {Object.keys(site.social).map((platform: string, idx: number) => (
                        <motion.a
                            key={idx}
                            href={site.social[platform]}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-charcoal-muted hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined">
                                {platform === 'twitter' ? 'alternate_email' : 'public'}
                            </span>
                        </motion.a>
                    ))}
                </motion.div>
            </div>

            <motion.div
                variants={itemVariants}
                className="max-w-[1200px] mx-auto text-center mt-8 pt-8 border-t border-gray-100 dark:border-gray-800"
            >
                <p className="text-xs text-gray-400">{data.copyright}</p>
            </motion.div>
        </motion.footer>
    );
}
