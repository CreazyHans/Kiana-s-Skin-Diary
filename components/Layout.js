// /frontend/components/Layout.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import CookieBanner from './CookieBanner';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';

export default function Layout({ children, pageTitle, description }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  const siteTitle = "Kiana's Skin Diary";
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : `${siteTitle} - Your Guide to Skincare & Style`;
  const GA_MEASUREMENT_ID = 'G-SNZNSMHZBV';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Kiana', href: '/blog' },
    { name: 'Products', href: '/products' },
    { name: "Kiana's Tools", href: '/tools/' },
    { name: 'Contact', href: '/contacto' },
  ];

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
          `,
        }}
      />

      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <Head>
          <title>{title}</title>
          <meta name="description" content={description || 'Your personal guide to understanding skincare science and finding your unique style.'} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* ===== HEADER ===== */}
        <header className="bg-white/60 backdrop-blur-md border-b sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

            {/* Logo */}
            <Link href="/">
              <a className="inline-flex items-center transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo.png"
                  alt="Kiana's Skin Diary Logo"
                  width={180}
                  height={40}
                  className="object-contain"
                />
              </a>
            </Link>

            {/* Desktop links + search */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-6 font-medium">
                {navLinks.map((link, idx) => (
                  <Link key={idx} href={link.href}>
                    <a className="relative text-gray-700 hover:text-green-600 transition-colors duration-300 group">
                      {link.name}
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all group-hover:w-full"></span>
                    </a>
                  </Link>
                ))}
              </nav>

              <div className="w-[300px]">
                <SearchBar />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
                className="p-2 rounded-md bg-white/70 border border-gray-200 shadow-sm"
              >
                <span className="block w-5 h-[2px] bg-gray-700 mb-1" />
                <span className="block w-5 h-[2px] bg-gray-700 mb-1" />
                <span className="block w-5 h-[2px] bg-gray-700" />
              </button>
            </div>
          </div>
        </header>

        {/* ===== MOBILE SIDEBAR ===== */}
        <div
          className={`fixed inset-y-0 left-0 z-40 transform bg-white shadow-xl w-72 transition-transform duration-300 md:hidden
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          aria-hidden={!isMenuOpen}
        >
          <div className="p-6 pt-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <Link href="/">
                <a onClick={() => setIsMenuOpen(false)}>
                  <Image src="/images/logo.png" alt="Logo" width={140} height={34} />
                </a>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="text-gray-700 text-lg">✕</button>
            </div>

            <nav className="flex flex-col gap-4 text-lg text-gray-700">
              {navLinks.map((link, idx) => (
                <Link key={idx} href={link.href}>
                  <a onClick={() => setIsMenuOpen(false)} className="py-2 border-b hover:text-green-600 transition">{link.name}</a>
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <SearchBar />
            </div>

            <div className="mt-auto text-sm text-gray-500">
              © {new Date().getFullYear()} Kiana's Skin Diary
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="bg-gray-100 border-t mt-8 py-6">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} Kiana's Skin Diary. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy-policy"><a className="hover:text-green-600 transition">Privacy Policy</a></Link>
              <Link href="/terms-of-service"><a className="hover:text-green-600 transition">Terms of Service</a></Link>
            </div>
          </div>
        </footer>

        <CookieBanner />
      </div>
    </>
  );
}
