import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import websiteData from '@/data/website.json';
import type { Metadata } from 'next';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${websiteData.site.name} - ${websiteData.site.tagline}`,
  description: websiteData.hero.subheadline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-background-light dark:bg-background-dark text-charcoal dark:text-gray-100 antialiased overflow-x-hidden`}>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* <Loading /> */}
        <Navbar data={websiteData} />
        {children}
        <Footer data={websiteData.footer} site={websiteData.site} />
      </body>
    </html>
  );
}
