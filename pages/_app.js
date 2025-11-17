// /pages/_app.js

import '../styles/globals.css';
import { Inter } from 'next/font/google';

// Configura la fuente con los subsets que necesitas
const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  return (
    // Aplica la clase de la fuente al componente principal
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;