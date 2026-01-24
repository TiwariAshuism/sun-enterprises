"use client";

import React, { useState } from 'react';
import Link from 'next/link';
// Import data handling
import productList from '@/data/products.json';

// Product Data Type
type Product = {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    icon: string;
};

// Use the imported data
const PRODUCTS: Product[] = productList;

export default function ProductsClient() {
    const [activeTab, setActiveTab] = useState('All');

    const tabs = [
        { name: 'All', icon: 'grid_view' },
        { name: 'Grains', icon: 'grass' },
        { name: 'Commodities', icon: 'nutrition' },
        { name: 'Marine', icon: 'sailing' },
    ];

    // Filtering Logic
    const filteredProducts = activeTab === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(product => product.category === activeTab);

    return (
        // Added pt-24 to address the "hiding under navbar" issue
        <main className="max-w-[1200px] mx-auto px-4 md:px-10 py-12 pt-32">
            {/* Headline Section */}
            <section className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#1c170d] dark:text-[#fcfbf8]">
                    Premium Global Commodities
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                    From nutritious grains to refined essentials, we export matchless quality products across the globe while abiding by international standards.
                </p>
            </section>

            {/* Sub-Navigation Tabs */}
            <section className="mb-16">
                <div className="flex flex-wrap justify-center border-b border-[#e8e0ce] dark:border-[#2a2416] gap-4 md:gap-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex flex-col items-center justify-center border-b-[3px] gap-2 pb-4 pt-2 group transition-all ${activeTab === tab.name
                                ? 'active-tab border-primary text-[#1c170d] dark:text-[#fcfbf8]'
                                : 'border-transparent text-neutral-400 hover:text-primary'
                                }`}
                        >
                            <span className={`material-symbols-outlined !text-3xl group-hover:scale-110 transition-transform ${activeTab === tab.name ? 'text-primary' : ''}`}>
                                {tab.icon}
                            </span>
                            <p className="text-xs font-bold uppercase tracking-widest">{tab.name}</p>
                        </button>
                    ))}
                </div>
            </section>

            {/* Product Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group relative bg-card-light dark:bg-[#252015] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border-2 border-gray-300 dark:border-gray-700"
                    >
                        <div
                            className="aspect-[16/10] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            data-alt={`Image of ${product.name}`}
                            style={{
                                backgroundImage: `url("${product.image}")`,
                            }}
                        >
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-[#1c170d] dark:text-[#fcfbf8]">{product.name}</h3>
                                <span className="text-primary material-symbols-outlined !text-2xl">
                                    {product.icon}
                                </span>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed line-clamp-3">
                                {product.description}
                            </p>
                            <Link
                                href={`/products/${product.id}`}
                                className="inline-flex items-center text-primary font-bold gap-1 hover:gap-3 transition-all"
                            >
                                Learn more{' '}
                                <span className="material-symbols-outlined !text-base">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                ))}

                {filteredProducts.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-neutral-400">
                        <span className="material-symbols-outlined !text-4xl mb-2">search_off</span>
                        <p>No products found in this category.</p>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="mt-24 mb-12">
                <div className="bg-card-light dark:bg-card-dark rounded-3xl p-10 md:p-20 text-center flex flex-col items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter text-[#1c170d] dark:text-[#fcfbf8]">
                            Ready to source premium quality?
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-10 max-w-xl mx-auto">
                            Join our global network of satisfied clients who trust us for their agricultural commodity needs.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact">
                                <button className="bg-primary text-background-dark px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all">
                                    Request Quote
                                </button>
                            </Link>
                            <button className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white dark:hover:bg-white/10 text-[#1c170d] dark:text-[#fcfbf8] transition-all">
                                View Catalog
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
