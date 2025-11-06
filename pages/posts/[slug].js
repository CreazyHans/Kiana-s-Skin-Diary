// /pages/posts/[slug].js

import { getAllPostSlugs, getPostData } from '../../lib/contentful'; // O como hayas llamado a tu lib
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'; // <-- ¡IMPORT MUY IMPORTANTE!
import Layout from '../../components/Layout';
import Image from 'next/image';
import Head from 'next/head'; // Importar Head para SEO

export default function PostPage({ post }) {
  if (!post) {
    return <Layout><h1>Post not found!</h1></Layout>;
  }

  return (
    <Layout pageTitle={post.title} description={post.excerpt}>
      <Head>
        <title>{`${post.title} | Kiana's Skin Diary`}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{post.title}</h1>
        <p className="text-gray-500 mb-6">Published on {post.date}</p>
        
        {post.cover_image && (
        <div className="relative w-full rounded-lg overflow-hidden mb-8 shadow-lg" style={{ paddingTop: '100%' }}>
          {/* paddingTop: '100%' crea un contenedor perfectamente cuadrado */}
          <Image 
            src={post.cover_image} 
            alt={`Cover image for ${post.title}`} 
            layout="fill" 
            objectFit="cover" // 'cover' seguirá funcionando bien en un cuadrado
            priority 
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        )}

        <div className="prose prose-lg max-w-none prose-pink">
          {/* --- ¡AQUÍ ESTÁ LA CORRECCIÓN! --- */}
          {/* Usamos el traductor para renderizar el contenido */}
          {documentToReactComponents(post.content)}
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostSlugs();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.slug);
  return {
    props: { post },
    revalidate: 60,
  };
}