// /components/CookieBanner.js

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // La lógica sigue siendo la misma: si no hay una decisión guardada, muestra el banner.
    const cookieConsent = localStorage.getItem('cookie_consent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  // MODIFICADO: Creamos una función más genérica para manejar ambas opciones.
  const handleConsent = (consentChoice) => {
    // Guardamos la decisión del usuario ('accepted' o 'rejected')
    localStorage.setItem('cookie_consent', consentChoice);
    setShowBanner(false);
    
    if (consentChoice === 'accepted') {
      // En el futuro, aquí podrías poner la lógica para activar Google Analytics
      console.log("Consentimiento aceptado.");
    } else {
      console.log("Consentimiento rechazado.");
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        <p className="text-sm text-center md:text-left md:mr-4">
          We use cookies to improve your experience and for analytics. Read our{' '}
          
          {/* CORRECCIÓN DE RUTA: Apuntando a la URL correcta */}
          <Link href="/privacy-policy" className="underline hover:text-green-400">
            Privacy Policy
          </Link>
          .
        </p>
        
        {/* NUEVO: Contenedor para los dos botones */}
        <div className="flex space-x-3 flex-shrink-0">
          <button 
            onClick={() => handleConsent('rejected')}
            className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors"
          >
            Rechazar
          </button>
          <button 
            onClick={() => handleConsent('accepted')}
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-500 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}