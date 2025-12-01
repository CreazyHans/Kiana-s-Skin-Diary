// /components/hooks/useIsMobile.js
import { useState, useEffect } from 'react';

export default function useIsMobile(breakpoint = 768) {
  // Inicializamos en 'null' para saber que el servidor no sabe el tamaño
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    // Esta función solo se ejecuta en el navegador (cliente)
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Llama a la función una vez al montar para saber el tamaño inicial
    handleResize();

    // Añade un listener para detectar cuando la ventana cambia de tamaño
    window.addEventListener('resize', handleResize);

    // Limpia el listener cuando el componente se desmonta para evitar fugas de memoria
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}