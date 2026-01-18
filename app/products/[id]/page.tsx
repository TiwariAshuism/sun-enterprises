'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import productsData from '@/data/products.json';
import productDetailsData from '@/data/product-details.json';

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;
    const [expandedVariety, setExpandedVariety] = useState<number | null>(null);

    const product = productsData.find((p) => p.id === productId);
    const details = productDetailsData[productId as keyof typeof productDetailsData];

    if (!product || !details) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-charcoal dark:text-white mb-4">Product Not Found</h1>
                    <Link href="/products" className="text-primary hover:text-primary-hover">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark pt-24 pb-20">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-16">
                <Link href="/products" className="inline-flex items-center text-primary hover:text-primary-hover mb-8 font-semibold">
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    Back to Products
                </Link>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={details.image}
                            alt={details.name}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-primary px-4 py-2 rounded-full text-sm font-semibold text-charcoal inline-block mb-4">
                            {details.category}
                        </div>
                        <h1 className="text-5xl font-bold text-charcoal dark:text-white mb-6">
                            {details.name}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                            {details.description}
                        </p>

                        <Link href="/contact">
                            <button className="bg-primary hover:bg-primary-hover text-charcoal font-bold px-8 py-4 rounded-full shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:scale-105 inline-flex items-center">
                                Request Quote
                                <span className="material-symbols-outlined ml-2">arrow_forward</span>
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Varieties Section */}
            {'varieties' in details && details.varieties && (
                <section className="container mx-auto px-6 mb-16">
                    <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-8">
                        {productId === 'rice' ? 'Available Rice Varieties' : 'Available Varieties'}
                    </h2>

                    {/* Check if varieties are objects (Rice) or strings (other products) */}
                    {typeof details.varieties[0] === 'object' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {details.varieties.map((variety: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border-2 border-gray-200 dark:border-gray-700"
                                >
                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-yellow-300/10">
                                        <Image
                                            src={variety.image}
                                            alt={variety.name}
                                            fill
                                            className="object-contain p-4"
                                        />
                                        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg">
                                            <span className="text-xs font-bold text-charcoal dark:text-white">
                                                {variety.length}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-charcoal dark:text-white mb-2">
                                            {variety.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            {variety.type}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center text-primary">
                                                <span className="material-symbols-outlined text-sm mr-1">
                                                    straighten
                                                </span>
                                                <span className="text-sm font-semibold">Length: {variety.length}</span>
                                            </div>
                                        </div>

                                        {expandedVariety === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                            >
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {variety.details}
                                                </p>
                                            </motion.div>
                                        )}

                                        <button
                                            onClick={() => setExpandedVariety(expandedVariety === index ? null : index)}
                                            className="w-full bg-primary hover:bg-primary-hover text-charcoal font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                                        >
                                            {expandedVariety === index ? (
                                                <>
                                                    <span>Hide Details</span>
                                                    <span className="material-symbols-outlined text-sm">
                                                        expand_less
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>More Details</span>
                                                    <span className="material-symbols-outlined text-sm">
                                                        expand_more
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(details.varieties as string[]).map((variety: string, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200 dark:border-gray-700"
                                >
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-primary text-3xl mr-4">
                                            check_circle
                                        </span>
                                        <h3 className="text-lg font-semibold text-charcoal dark:text-white">
                                            {variety}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Packing Types */}
            {details.packingTypes && (
                <section className="container mx-auto px-6 mb-16">
                    <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-8">Packing Options</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {details.packingTypes.map((pack: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-200 dark:border-gray-700"
                            >
                                {pack.image && (
                                    <div className="relative h-64">
                                        <Image
                                            src={pack.image}
                                            alt={pack.size}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-primary mb-3">{pack.size}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{pack.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* By Products (for Tuna) */}
            {'byProducts' in details && details.byProducts && (
                <section className="container mx-auto px-6 mb-16">
                    <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-8">By-Products</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {details.byProducts.map((byProduct: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700"
                            >
                                <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-4">
                                    {byProduct.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">{byProduct.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Specifications */}
            {details.specifications && (
                <section className="container mx-auto px-6 mb-16">
                    <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-8">Product Specifications</h2>

                    {/* Presentation Table (for Tuna) */}
                    {'presentation' in details.specifications && details.specifications.presentation && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 border-2 border-gray-200 dark:border-gray-700">
                            <div className="bg-primary px-6 py-4">
                                <h3 className="text-xl font-bold text-charcoal">Presentation: Types of Products</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-charcoal dark:text-white font-semibold">Can Size</th>
                                            <th className="px-6 py-4 text-left text-charcoal dark:text-white font-semibold">Type of Packing</th>
                                            <th className="px-6 py-4 text-left text-charcoal dark:text-white font-semibold">Net Weight</th>
                                            <th className="px-6 py-4 text-left text-charcoal dark:text-white font-semibold">Drained Weight</th>
                                            <th className="px-6 py-4 text-left text-charcoal dark:text-white font-semibold">Carton Capacity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {details.specifications.presentation.map((item: any, index: number) => (
                                            <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-semibold">{item.canSize}</td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.typeOfPacking}</td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.normalNetWeight}</td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.drainedWeight}</td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.capacityOfCartons}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Ingredients */}
                    {'ingredients' in details.specifications && details.specifications.ingredients && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
                            <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-6">Ingredients</h3>
                            <div className="space-y-4">
                                {details.specifications.ingredients.map((ingredient: any, index: number) => (
                                    <div key={index} className="border-l-4 border-primary pl-4">
                                        <h4 className="font-bold text-charcoal dark:text-white mb-2">{ingredient.name}</h4>
                                        <p className="text-gray-600 dark:text-gray-400">{ingredient.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quality Factors */}
                    {details.specifications.qualityFactors && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border-2 border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-6">Quality Factors</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {Object.entries(details.specifications.qualityFactors).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <span className="font-semibold text-charcoal dark:text-white capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                                        </span>
                                        <span className="text-primary font-bold">{value as string}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Defect Tolerance */}
                    {'defectTolerance' in details.specifications && details.specifications.defectTolerance && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border-2 border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-6">Defect Tolerance</h3>
                            <ul className="space-y-3">
                                {details.specifications.defectTolerance.map((item: string, index: number) => (
                                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                                        <span className="material-symbols-outlined text-green-500 mr-3">
                                            check_circle
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Certifications */}
                    {'certifications' in details.specifications && details.specifications.certifications && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border-2 border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-6">Certifications</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {details.specifications.certifications.map((cert: string, index: number) => (
                                    <div key={index} className="flex items-center p-4 bg-primary/10 rounded-lg">
                                        <span className="material-symbols-outlined text-primary mr-3">
                                            verified
                                        </span>
                                        <span className="text-charcoal dark:text-white font-semibold">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Finished Products */}
                    {details.specifications.finishedProducts && (
                        <div className="bg-gradient-to-r from-primary/20 to-yellow-300/20 rounded-xl shadow-lg p-8 border-2 border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-6">Finished Product Details</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {Object.entries(details.specifications.finishedProducts).map(([key, value]) => (
                                    <div key={key}>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                        <p className="text-xl font-bold text-charcoal dark:text-white mt-1">{value as string}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* CTA Section */}
            <section className="container mx-auto px-6">
                <div className="bg-primary rounded-2xl p-12 text-center shadow-2xl">
                    <h2 className="text-4xl font-bold text-charcoal mb-4">Interested in {details.name}?</h2>
                    <p className="text-lg text-charcoal/80 mb-8 max-w-2xl mx-auto">
                        Get in touch with us for pricing, availability, and customized solutions for your business needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <button className="bg-charcoal hover:bg-charcoal/90 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105">
                                Contact Sales Team
                            </button>
                        </Link>
                        <Link href="/products">
                            <button className="bg-white hover:bg-gray-100 text-charcoal font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105">
                                View All Products
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
