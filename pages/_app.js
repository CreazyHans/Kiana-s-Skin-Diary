// /pages/_app.js

import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { getAllPosts } from '../lib/contentful'; // Importamos la función para obtener todos los posts

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps, allPosts }) {
  // Añadimos 'allPosts' a las props de cada página para que el Layout pueda acceder a ellos
  pageProps.allPosts = allPosts; 
  
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

// Esta función especial se ejecuta una vez cuando la aplicación se construye (en el servidor).
// Obtiene todos los posts y los pasa como una "prop" global a nuestra aplicación.
MyApp.getInitialProps = async () => {
  const allPosts = await getAllPosts();
  return { allPosts: allPosts || [] }; // Aseguramos que siempre sea un array
}

export default MyApp;