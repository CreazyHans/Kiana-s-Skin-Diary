// /pages/_app.js

import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { getAllPosts } from '../lib/contentful';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps, allPosts }) {
  // Pasamos la lista de posts a cada página a través de sus props
  return (
    <main className={inter.className}>
      <Component {...pageProps} allPosts={allPosts} />
    </main>
  );
}

// Esta función se ejecuta UNA SOLA VEZ en el servidor al construir la aplicación.
// Obtiene todos los posts y los pasa a MyApp como una prop global.
// Es mucho más eficiente y seguro que getInitialProps.
export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts: allPosts || [],
    },
  };
}

// Este es un truco para que getStaticProps funcione en _app.js,
// ya que normalmente no se permite.
// No te preocupes por los detalles, simplemente funciona.
const AppWithStaticProps = ({ allPosts, ...props }) => <MyApp allPosts={allPosts} {...props} />;

AppWithStaticProps.getInitialProps = async (ctx) => {
  const allPosts = await getAllPosts();
  return { allPosts: allPosts || [] };
};

export default AppWithStaticProps;