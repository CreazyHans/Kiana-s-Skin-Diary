// /pages/index.js
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getCategoriesWithPosts } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function HomePage({ categoriesWithPosts }) {
  return (
    <Layout>
      <section className="text-center py-16 px-4 bg-pink-50 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Welcome to <span className="text-green-600">Kiana's Skin Diary</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore skincare topics based on science. Find the perfect routine and products for your skin type.
        </p>
      </section>

      <div className="mt-16 space-y-16">
        {categoriesWithPosts.map((category, categoryIndex) => (
          <section key={category.slug}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
              <div className="mt-2 text-gray-600 max-w-2xl mx-auto">
                {documentToReactComponents(category.description)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.posts.map((post, postIndex) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  // 👇 ESTA ES LA LÍNEA MÁGICA 👇
                  // Solo será 'true' para el primer post de la primera categoría
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