// /components/Layout.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import CookieBanner from './CookieBanner';
import { useRouter } from 'next/router';

// 🔍 Importamos el componente de búsqueda
import SearchBar from './SearchBar';

export default function Layout({ children, pageTitle, description }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const siteTitle = "Kiana's Skin Diary";
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : `${siteTitle} - Your Guide to Skincare & Style`;
  const GA_MEASUREMENT_ID = 'G-SNZNSMHZBV';

  return (
    <>
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
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        
        <Head>
          <meta name="p:domain_verify" content="f5c9c92ffa7578915f50a52631296ba8"/>
          <title>{title}</title>
          <meta name="description" content={description || 'Your personal guide to understanding skincare science and finding your unique style.'} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* HEADER */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">

            {/* Logo */}
            <Link href="/">
              <Image 
                src="/images/logo.png" 
                alt="Kiana's Skin Diary Logo"
                width={180} 
                height={40} 
              />
            </Link>

            {/* Menu desktop */}
            <nav className="hidden md:flex space-x-6 text-gray-600 font-medium items-center">

              <Link href="/" className="hover:text-green-600">Home</Link>
              <Link href="/blog" className="hover:text-green-600">About Kiana</Link>
              <Link href="/products" className="hover:text-green-600">Products</Link>
              <Link href="/tools/routine-builder" className="hover:text-green-600">Kiana's Tools</Link>
              <Link href="/contacto" className="hover:text-green-600">Contact</Link>

              {/* 🔍 BARRA DE BÚSQUEDA */}
              <div className="hidden md:flex items-center justify-end w-[350px]">
  <SearchBar />
</div>


            </nav>

            {/* Botón menú móvil */}
            <div className="md:hidden z-50">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="w-8 h-8 flex flex-col justify-center items-center"
              >
                <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-6 bg-gray-600 my-1 transition-all ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>

          </div>
        </header>

        {/* Menú móvil */}
        <div className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-lg z-30 transform transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          <div className="pt-24 px-6 space-y-4">
            <Link href="/" className="block py-2 text-lg text-gray-700 hover:text-green-600">Home</Link>
            <Link href="/blog" className="block py-2 text-lg text-gray-700 hover:text-green-600">About Kiana</Link>
            <Link href="/products" className="block py-2 text-lg text-gray-700 hover:text-green-600">Products</Link>
            <Link href="/tools/routine-builder" className="block py-2 text-lg text-gray-700 hover:text-green-600">Kiana's Tools</Link>
            <Link href="/contacto" className="block py-2 text-lg text-gray-700 hover:text-green-600">Contact</Link>

            {/* 🔍 Búsqueda en móvil */}
            <div className="pt-4 w-full">
  <SearchBar mobile />
</div>

          </div>

        </div>

        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* CONTENIDO */}
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t mt-8">
          <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
            <p className="mb-4 md:mb-0 text-center md:text-left">
              © {new Date().getFullYear()} Kiana's Skin Diary. All rights reserved.
            </p>

            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="hover:text-green-600">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-green-600">Terms of Service</Link>
            </div>
          </div>
        </footer>

        <CookieBanner /> 
      </div>
    </>
  );
}
