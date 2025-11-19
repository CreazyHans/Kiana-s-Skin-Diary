// /components/Layout.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import CookieBanner from './CookieBanner';
import { useRouter } from 'next/router';
import { getAllPostsForSearch } from '../lib/contentful'; // <-- IMPORTAMOS LA NUEVA FUNCIÓN

// --- COMPONENTE DEL MODAL DE BÚSQUEDA ---
const SearchModal = ({ isOpen, onClose, allPosts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
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
      setTimeout(() => {
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


export default function Layout({ children, pageTitle, description }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [allPosts, setAllPosts] = useState([]); // <-- NUEVO ESTADO PARA GUARDAR LOS POSTS
  const router = useRouter();

  // OBTENEMOS LOS POSTS UNA SOLA VEZ AL CARGAR EL LAYOUT
  useEffect(() => {
    const fetchPostsForSearch = async () => {
      const posts = await getAllPostsForSearch();
      setAllPosts(posts);
    };
    fetchPostsForSearch();
  }, []); // El array vacío asegura que solo se ejecute una vez

  // Cierra los menús al cambiar de página
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
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
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `...` }} />
    
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <Head>{/* ... */}</Head>
        
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/"><Image src="/images/logo.png" alt="Kiana's Skin Diary Logo" width={180} height={40} /></Link>
            
            <nav className="hidden md:flex space-x-8 text-gray-600 font-medium items-center">
              <Link href="/" className="hover:text-green-600">Home</Link>
              <Link href="/blog" className="hover:text-green-600">About Kiana</Link>
              <Link href="/products" className="hover:text-green-600">Products</Link>
              <Link href="/tools/routine-builder" className=" hover:text-green-600">Kiana's Tools</Link>
              <Link href="/contacto" className="hover:text-green-600">Contact</Link>
              <button onClick={() => setIsSearchOpen(true)} aria-label="Open search" className="text-gray-600 hover:text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </nav>

            <div className="md:hidden flex items-center space-x-4 z-50">
               <button onClick={() => setIsSearchOpen(true)} aria-label="Open search" className="text-gray-600 hover:text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="w-8 h-8 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-600 my-1 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
              </button>
            </div>
          </div>
        </header>

        {/* ... (el resto de tu código, menú móvil, overlay, main, footer, etc. no cambia) ... */}
        
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} allPosts={allPosts} />
      </div>
    </>
  );
}