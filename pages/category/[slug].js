// /pages/category/[slug].js
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import { getAllCategories, getPostsByCategory } from '../../lib/contentful'; // <-- RUTA ACTUALIZADA
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'; // <-- IMPORTAR RENDERIZADOR

export default function CategoryPage({ category, posts }) {
  return (
    <Layout pageTitle={category.name}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">{category.name}</h1>
        {/* --- ¡AQUÍ ESTÁ LA CORRECCIÓN! --- */}
        <div className="mt-2 text-gray-600">{documentToReactComponents(category.description)}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const allCategories = await getAllCategories();
  const category = allCategories.find(cat => cat.slug === params.slug);
  const posts = await getPostsByCategory(params.slug);

  return {
    props: { category, posts },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const categories = await getAllCategories();
  const paths = categories.map((cat) => ({
    params: { slug: cat.slug },
  }));
  return { paths, fallback: false };
}