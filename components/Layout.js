// /components/Layout.js
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import CookieBanner from './CookieBanner';

export default function Layout({ children, pageTitle, description }) {
  const siteTitle = "Kiana's Skin Diary";
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : `${siteTitle} - Your Guide to Skincare & Style`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description || 'Your personal guide to understanding skincare science and finding your unique style.'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/">
            <Image src="/images/logo.png" alt="Kiana's Skin Diary Logo" width={180} height={40} />
          </Link>
          <nav className="space-x-8 text-gray-600 font-medium">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <Link href="/blog" className="hover:text-green-600">About Kiana</Link>
            <Link href="/products" className="hover:text-green-600">Products</Link>
            
            <Link href="/contacto" className="hover:text-green-600">Contact</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">{children}</main>
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kiana's Skin Diary. All rights reserved.</p>
          <nav className="mt-4 space-x-4">
            <Link href="/privacy" className="hover:text-green-600 text-sm">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-green-600 text-sm">Terms of Service</Link>
          </nav>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}