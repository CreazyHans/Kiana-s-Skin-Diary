// /components/Layout.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import CookieBanner from './CookieBanner';
import { useRouter } from 'next/router';

// --- NUEVO COMPONENTE DE BÚSQUEDA ---
const SearchModal = ({ isOpen, onClose, allPosts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!allPosts) return; // Protección por si los posts no han cargado
    if (searchTerm.length > 2) {
      const searchResults = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchTerm, allPosts]);
  
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { // Pequeño retraso para que la animación de salida termine
        setSearchTerm('');
        setResults([]);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-start z-50 pt-20 animate-fade-in-fast" onClick={onClose}>
      <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-4 animate-slide-down" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Search for articles, ingredients..."
          className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-pink-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        <div className="mt-4 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            results.map(post => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="block p-3 hover:bg-gray-100 rounded-md text-gray-800">
                {post.title}
              </Link>
            ))
          ) : (
            searchTerm.length > 2 && <p className="text-gray-500 p-3">No results found for "{searchTerm}"</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default function Layout({ children, pageTitle, description, allPosts }) { // AÑADIMOS allPosts aquí
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // NUEVO ESTADO PARA LA BÚSQUEDA
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setIsSearchOpen(false); // Cierra la búsqueda al cambiar de página
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
        
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/">
              <Image src="/images/logo.png" alt="Kiana's Skin Diary Logo" width={180} height={40} />
            </Link>
            
            <nav className="hidden md:flex space-x-8 text-gray-600 font-medium items-center">
              <Link href="/" className="hover:text-green-600">Home</Link>
              <Link href="/blog" className="hover:text-green-600">About Kiana</Link>
              <Link href="/products" className="hover:text-green-600">Products</Link>
              <Link href="/tools/routine-builder" className=" hover:text-green-600">Kiana's Tools</Link>
              <Link href="/contacto" className="hover:text-green-600">Contact</Link>
              {/* --- BOTÓN DE BÚSQUEDA (ESCRITORIO) --- */}
              <button onClick={() => setIsSearchOpen(true)} aria-label="Open search" className="text-gray-600 hover:text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </nav>

            {/* --- ICONOS MÓVILES (BÚSQUEDA Y MENÚ) --- */}
            <div className="md:hidden flex items-center space-x-4 z-50">
               <button onClick={() => setIsSearchOpen(true)} aria-label="Open search" className="text-gray-600 hover:text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="w-8 h-8 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-600 my-1 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>
        </header>

        <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="pt-24 px-6 space-y-4">
              <Link href="/" className="block py-2 text-lg text-gray-700 hover:text-green-600">Home</Link>
              <Link href="/blog" className="block py-2 text-lg text-gray-700 hover:text-green-600">About Kiana</Link>
              <Link href="/products" className="block py-2 text-lg text-gray-700 hover:text-green-600">Products</Link>
              <Link href="/tools/routine-builder" className="block py-2 text-lg text-gray-700 hover:text-green-600 font-bold">Kiana's Tools</Link>
              <Link href="/contacto" className="block py-2 text-lg text-gray-700 hover:text-green-600">Contact</Link>
            </div>
        </div>

        {isMenuOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setIsMenuOpen(false)}></div>}
        
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>

        <footer className="bg-white border-t mt-8">{/* ... (Tu footer no cambia) ... */}</footer>

        <CookieBanner /> 
        
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} allPosts={allPosts || []} />
      </div>
    </>
  );
}