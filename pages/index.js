// /pages/index.js

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getCategoriesWithPosts } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';

export default function HomePage({ categoriesWithPosts }) {
  return (
    <Layout>
      <section className="text-center py-16 px-4 bg-pink-50 rounded-lg shadow-inner">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Welcome to <span className="text-green-600">Kiana's Skin Diary</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore skincare topics based on science. Find the perfect routine and products for your skin type.
        </p>
      </section>

      <section className="my-16">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Discover Our Interactive Skincare Tools
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-xl mx-auto">
            Go beyond the articles. Use our free tools to get personalized advice and build a smarter routine in seconds.
          </p>
          <div className="mt-8">
            <Link href="/tools" className="inline-block bg-pink-600 text-white font-bold py-3 px-10 rounded-full hover:bg-pink-700 transition-all duration-300 text-xl shadow-md">
                Explore Kiana's Tools
            </Link>
          </div>
        </div>
      </section>

      <div className="space-y-16">
        {categoriesWithPosts.map((category, categoryIndex) => (
          <section key={category.slug}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
              {category.description && (
                <div className="mt-2 text-gray-600 max-w-2xl mx-auto prose">
                  {documentToReactComponents(category.description)}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.posts.map((post, postIndex) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  isPriority={categoryIndex === 0 && postIndex === 0}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const categoriesWithPosts = await getCategoriesWithPosts();
  return {
    props: {
      categoriesWithPosts,
    },
    revalidate: 60,
  };
}