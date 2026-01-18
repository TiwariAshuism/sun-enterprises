'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Certification {
    name: string;
    logo: string;
}

interface CertificationsProps {
    certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        let scrollPosition = 0;
        const scrollSpeed = 0.5; // Adjust speed here

        const scroll = () => {
            scrollPosition += scrollSpeed;

            if (scrollContainer) {
                scrollContainer.scrollLeft = scrollPosition;

                // Reset scroll position when reaching the end
                if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                    scrollPosition = 0;
                }
            }

            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        // Pause on hover
        const handleMouseEnter = () => {
            cancelAnimationFrame(animationFrameId);
        };

        const handleMouseLeave = () => {
            animationFrameId = requestAnimationFrame(scroll);
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (scrollContainer) {
                scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
                scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    // Duplicate the certifications array for seamless loop
    const duplicatedCertifications = [...certifications, ...certifications];

    return (
        <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-4">
                        Certifications & Partners
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Trusted by leading brands and certified by international quality standards
                    </p>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-12 overflow-hidden"
                style={{ scrollBehavior: 'auto' }}
            >
                {duplicatedCertifications.map((cert, index) => (
                    <div
                        key={`${cert.name}-${index}`}
                        className="flex-shrink-0 w-48 h-32 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center justify-center p-6 border-2 border-gray-200 dark:border-gray-700"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={cert.logo}
                                alt={cert.name}
                                fill
                                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
