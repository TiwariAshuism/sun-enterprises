import websiteData from '@/data/website.json';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';

export default function HomePage() {
  return (
    <main>
      <Hero data={websiteData.hero} />
      <Features data={websiteData.features} />
      <Services data={websiteData.services} />
      <Testimonials data={websiteData.testimonials} />
      <Stats data={websiteData.stats} />
    </main>
  );
}
