// /pages/posts/[slug].js

import { getAllPostSlugs, getPostData } from '../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Head from 'next/head';

export default function PostPage({ post }) {
  if (!post) {
    return <Layout><h1>Post not found!</h1></Layout>;
  }

  // Convert excerpt (Rich Text) to plain text for SEO meta tags
  const getPlainText = (richText) => {
    if (!richText || !richText.content) return '';
    return richText.content.map(block =>
      block?.content?.map(span => span?.value).join(' ')
    ).join(' ');
  };

  const plainExcerpt = getPlainText(post.excerpt);

  return (
    <Layout pageTitle={post.title} description={plainExcerpt}>
      <Head>
        <title>{post.title} | Kiana's Skin Diary</title>
        <meta name="description" content={plainExcerpt} />
      </Head>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          {post.title}
        </h1>

        {post.date && (
          <p className="text-gray-500 mb-6">Published on {post.date}</p>
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
          {documentToReactComponents(post.content)}
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
