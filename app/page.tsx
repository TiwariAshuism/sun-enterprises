import websiteData from '@/data/website.json';
import productsData from '@/data/products.json';
import certificationsData from '@/data/certifications.json';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import Certifications from '@/components/Certifications';
import PrivateLabeling from '@/components/PrivateLabeling';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main>
      <Hero data={websiteData.hero} />
      <Features data={websiteData.features} />

      {/* Products Section */}
      <section id="products" className="py-20 bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our range of premium quality grains, pulses, and commodities sourced from India&apos;s finest agricultural regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {productsData.map((product) => (
              <div
                key={product.id}
                className="group bg-card-light dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-sm font-semibold text-charcoal">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center text-primary hover:text-primary-hover font-semibold transition-colors"
                  >
                    Learn More
                    <span className="material-symbols-outlined ml-1 text-[20px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <button className="bg-primary hover:bg-primary-hover text-charcoal font-bold px-8 py-4 rounded-full shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:scale-105">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Certifications certifications={certificationsData} />
      <PrivateLabeling data={websiteData.privateLabeling} />
      <Services data={websiteData.services} />
      <Testimonials data={websiteData.testimonials} />
      <Stats data={websiteData.stats} />
    </main>
  );
}
