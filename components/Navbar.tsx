'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar({ data }: { data: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSegment, setActiveSegment] = useState('');
    const [currentHash, setCurrentHash] = useState('');
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const navBackground = useTransform(
        scrollY,
        [0, 100],
        ['rgba(252, 251, 248, 0.0)', 'rgba(252, 251, 248, 0.95)']
    );

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update active segment on pathname change
    useEffect(() => {
        setActiveSegment(pathname);
        // Reset hash when pathname changes (unless we are just navigating to a hash on the same page, handled by click)
        // Actually, if we navigate to a new page, hash is usually empty unless specified.
        if (typeof window !== 'undefined') {
            setCurrentHash(window.location.hash);
        }
    }, [pathname]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentHash(window.location.hash);

            const onHashChange = () => {
                setCurrentHash(window.location.hash);
            };
            window.addEventListener('hashchange', onHashChange);
            return () => window.removeEventListener('hashchange', onHashChange);
        }
    }, []);

    const isActive = (href: string) => {
        if (href.startsWith('/#') || href.includes('#')) {
            const [path, hash] = href.replace('/', '').split('#'); // Remove leading / for simpler check
            // href is like /#solutions -> path='', hash='solutions'
            // href is like /#sustainability -> path='', hash='sustainability'

            // Standardize current pathname (remove leading /)
            const currentPath = pathname === '/' ? '' : pathname.replace('/', '');

            if (path === currentPath) {
                return currentHash === `#${hash}`;
            }
            return false;
        }

        // Normal links
        if (href === '/' && pathname === '/') return true;
        if (href !== '/' && pathname.startsWith(href)) return true;
        return false;
    };

    const handleLinkClick = (href: string) => {
        setIsOpen(false);
        if (href.includes('#')) {
            // Manually set hash slightly after click to ensure UI update if event lag
            const hash = href.split('#')[1];
            if (hash) setCurrentHash(`#${hash}`);
        } else {
            setCurrentHash('');
        }
    };

    return (
        <motion.nav
            style={{ backgroundColor: navBackground }}
            className="fixed top-0 w-full z-50 border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 backdrop-blur-md"
        >
            <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group cursor-pointer" onClick={() => handleLinkClick('/')}>
                    <motion.div
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="size-8 text-primary flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined text-3xl">{data.site.logo}</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-charcoal dark:text-white text-lg font-bold tracking-tight"
                    >
                        {data.site.name}
                    </motion.h1>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    {data.navigation.map((item: any, idx: number) => {
                        const isLinkActive = isActive(item.href);
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => handleLinkClick(item.href)}
                                    className={`text-sm font-medium transition-colors relative group ${isLinkActive ? 'text-charcoal dark:text-white' : 'text-charcoal/80 dark:text-gray-300 hover:text-charcoal dark:hover:text-white'}`}
                                >
                                    {item.label}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300"
                                        initial={{ width: '0%' }}
                                        animate={{ width: isLinkActive ? '100%' : '0%' }}
                                        whileHover={{ width: '100%' }}
                                    />
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div
                    className="hidden md:flex"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-charcoal dark:bg-white text-white dark:text-charcoal text-sm font-semibold h-10 px-6 rounded-full hover:bg-black dark:hover:bg-gray-200 transition-all duration-300 shadow-lg"
                        >
                            Contact Us
                        </motion.button>
                    </Link>
                </motion.div>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden p-2 text-charcoal dark:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="material-symbols-outlined">menu</span>
                </motion.button>
            </div>
        </motion.nav>
    );
}
