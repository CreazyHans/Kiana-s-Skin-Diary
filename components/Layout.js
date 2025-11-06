// /components/Layout.js

import { useState } from 'react'; // <-- 1. Importar useState
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import CookieBanner from './CookieBanner';

export default function Layout({ children, pageTitle, description }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- 2. Estado para controlar el menú móvil

  const siteTitle = "Kiana's Skin Diary";
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : `${siteTitle} - Your Guide to Skincare & Style`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description || 'Your personal guide to understanding skincare science and finding your unique style.'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/">
            <Image src="/images/logo.png" alt="Kiana's Skin Diary Logo" width={180} height={40} />
          </Link>
          
          {/* --- MENÚ PARA ESCRITORIO (md y superior) --- */}
          <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <Link href="/blog" className="hover:text-green-600">About Kiana</Link>
            <Link href="/products" className="hover:text-green-600">Products</Link>
            <Link href="/contacto" className="hover:text-green-600">Contact</Link>
          </nav>

          {/* --- BOTÓN DE HAMBURGUESA (solo en móvil) --- */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* --- MENÚ DESPLEGABLE MÓVIL --- */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <Link href="/"><a className="block py-3 px-6 text-gray-600 hover:bg-gray-50">Home</a></Link>
            <Link href="/blog"><a className="block py-3 px-6 text-gray-600 hover:bg-gray-50">About Kiana</a></Link>
            <Link href="/products"><a className="block py-3 px-6 text-gray-600 hover:bg-gray-50">Products</a></Link>
            <Link href="/contacto"><a className="block py-3 px-6 text-gray-600 hover:bg-gray-50">Contact</a></Link>
          </div>
        )}
      </header>
      
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>

      <footer>
          {/* ... tu footer se queda igual ... */}
      </footer>

      <CookieBanner /> 
    </div>
  );
}