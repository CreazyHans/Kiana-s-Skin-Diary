// /pages/posts/[slug].js

import { getAllPostSlugs, getPostData } from '../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Head from 'next/head';
import { BLOCKS } from '@contentful/rich-text-types';

// 1. Importa el componente CORRECTO que creamos
import ResponsiveRichTextTable from '../../components/ResponsiveRichTextTable';

export default function PostPage({ post }) {
  if (!post) {
    return <Layout><h1>Post not found!</h1></Layout>;
  }

  const getPlainText = (richText) => {
    if (!richText || !richText.content) return '';
    return richText.content.map(block =>
      block?.content?.map(span => span?.value).join(' ')
    ).join(' ');
  };

  const plainExcerpt = getPlainText(post.excerpt);

  // 2. Usa el componente CORRECTO en las opciones de renderizado
  const renderOptions = {
    renderNode: {
      [BLOCKS.TABLE]: (node, children) => (
        // Llama al nuevo componente y pásale el 'node' de Contentful
        <ResponsiveRichTextTable node={node} />
      ),
    },
  };

  return (
    <Layout pageTitle={post.title} description={plainExcerpt}>
      <Head>
        <title>{`${post.title} | Kiana's Skin Diary`}</title>
        <meta name="description" content={plainExcerpt} />
      </Head>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          {post.title}
        </h1>

        {post.date && (
          <p className="text-gray-500 mb-6">Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        )}

        {post.cover_image && (
          <div className="relative w-full rounded-lg overflow-hidden mb-8 shadow-lg" style={{ paddingTop: '60%' }}>
            <Image 
              src={post.cover_image}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-pink">
          {documentToReactComponents(post.content, renderOptions)}
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostSlugs();
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.slug); 
  return {
    props: { post },
    revalidate: 60,
  };
}