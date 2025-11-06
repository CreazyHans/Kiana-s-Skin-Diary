// /components/CookieBanner.js

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie_consent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        <p className="text-sm text-center md:text-left">
          We use cookies to enhance your experience and for analytics. By continuing to visit this site you agree to our use of cookies. Read our{' '}
          
          {/* --- ¡AQUÍ ESTÁ LA CORRECCIÓN! --- */}
          <Link href="/privacy" className="underline hover:text-pink-400">
            Privacy Policy
          </Link>
          .
        </p>
        <button 
          onClick={handleAccept}
          className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-700 transition-colors flex-shrink-0"
        >
          Accept
        </button>
      </div>
    </div>
  );
}