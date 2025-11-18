// /components/Layout.js

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import CookieBanner from './CookieBanner';

export default function Layout({ children, pageTitle, description }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const siteTitle = "Kiana's Skin Diary";
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : `${siteTitle} - Your Guide to Skincare & Style`;
  const GA_MEASUREMENT_ID = 'G-SNZNSMHZBV'; // <-- TU ID DE MEDICIÓN CORRECTO

  return (
    <>
      {/* --- NUEVOS SCRIPTS DE CONEXIÓN DIRECTA A GOOGLE ANALYTICS 4 --- */}
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
        
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/">
              <Image src="/images/logo.png" alt="Kiana's Skin Diary Logo" width={180} height={40} />
            </Link>
            
            <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
              <Link href="/" className="hover:text-green-600">Home</Link>
              <Link href="/blog" className="hover:text-green-600">About Kiana</Link>
              <Link href="/products" className="hover:text-green-600">Products</Link>
              <Link href="/contacto" className="hover:text-green-600">Contact</Link>
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="to 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <Link href="/" className="block py-3 px-6 text-gray-600 hover:bg-gray-50">Home</Link>
              <Link href="/blog" className="block py-3 px-6 text-gray-600 hover:bg-gray-50">About Kiana</Link>
              <Link href="/products" className="block py-3 px-6 text-gray-600 hover:bg-gray-50">Products</Link>
              <Link href="/contacto" className="block py-3 px-6 text-gray-600 hover:bg-gray-50">Contact</Link>
            </div>
          )}
        </header>
        
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>

        <footer className="bg-white border-t mt-8">
          <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
            <p className="mb-4 md:mb-0 text-center md:text-left">
              © {new Date().getFullYear()} Kiana's Skin Diary. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="hover:text-green-600 transition">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-green-600 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>

        <CookieBanner /> 
      </div>
    </>
  );
}